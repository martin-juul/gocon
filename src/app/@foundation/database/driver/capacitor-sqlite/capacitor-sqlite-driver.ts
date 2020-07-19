import { AbstractSqliteDriver } from '../sqlite-abstract';
import { QueryRunner } from '../../query-runner';
import { CapacitorSqliteConnectionOptions } from './capacitor-sqlite-connection-options';
import { CapacitorSQLitePlugin } from 'capacitor-sqlite';
import { Connection } from '../../connection';
import { DriverOptionNotSetError } from '../../error';
import { ColumnType } from '../types';
import { CapacitorQueryRunner } from './capacitor-query-runner';

export class CapacitorSqliteDriver extends AbstractSqliteDriver {

  options: CapacitorSqliteConnectionOptions;

  driver: CapacitorSQLitePlugin;

  constructor(connection: Connection) {
    super(connection);

    this.connection = connection;
    this.options = connection.options as CapacitorSqliteConnectionOptions;
    this.database = this.options.database;
    this.driver = this.options.driver;

    // validate options to make sure everything is set
    if (!this.options.database) {
      throw new DriverOptionNotSetError('database');
    }
  }

  createQueryRunner(mode: 'master' | 'slave' = 'master'): QueryRunner {
    if (!this.queryRunner) {
      this.queryRunner = new CapacitorQueryRunner(this);
    }

    return this.queryRunner;
  }

  normalizeType(column: { type?: ColumnType, length?: number | string, precision?: number | null, scale?: number }): string {
    if ((column.type as any) === Buffer) {
      return 'blob';
    }

    return super.normalizeType(column);
  }

  async disconnect(): Promise<void> {
    await this.databaseConnection.close({});
  }

  protected createDatabaseConnection() {
    return new Promise<void>((resolve, reject) => {
      this.databaseConnection.open({
        database: this.options.database,
        mode: this.options.key === undefined ? undefined : 'encryption',
      }).then((res) => {
        if (!res.result) {
          reject(res.message);
        }

        this.databaseConnection.execute({
          statement: 'PRAGMA foreign_keys = ON;',
        }).then((res) => {
          if (!res.result) {
            reject(res.message);
          }
        }).catch(reject);
      }).catch(reject);
    });
  }

  protected loadDependencies() {
    this.sqlite = this.databaseConnection;

    if (!this.databaseConnection) {
      throw new DriverOptionNotSetError('driver');
    }
  }
}
