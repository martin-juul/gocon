import { AbstractSqliteQueryRunner } from '../sqlite-abstract';
import { CapacitorSqliteDriver } from './capacitor-sqlite-driver';
import { Broadcaster } from '../../subscriber';
import { QueryFailedError, QueryRunnerAlreadyReleasedError } from '../../error';
import { CapacitorSQLitePlugin } from 'capacitor-sqlite';

export class CapacitorQueryRunner extends AbstractSqliteQueryRunner {

  driver: CapacitorSqliteDriver;

  constructor(driver: CapacitorSqliteDriver) {
    super();
    this.driver = driver;
    this.connection = driver.connection;
    this.broadcaster = new Broadcaster(this);
  }

  query(query: string, parameters?: any[]): Promise<any> {
    if (this.isReleased) {
      throw new QueryRunnerAlreadyReleasedError();
    }

    const connection = this.driver.connection;

    return new Promise<any>((resolve, reject) => {
      //const isInsertQuery = query.substr(0, 11) === 'INSERT INTO';

      this.driver.connection.logger.logQuery(query, parameters, this);
      //const queryStartTime = +new Date();

      this.connect().then((databaseConnection: CapacitorSQLitePlugin) => {
        databaseConnection.query({
          statement: query,
          values: parameters,
        }).then((res) => {
          if (!res.result) {
            reject(new QueryFailedError(query, parameters, res.message));
          }

          resolve(res.values);
        }).catch((e) => {
          connection.logger.logQueryError(e, query, parameters, this);
        })
      });

    });
  }

}
