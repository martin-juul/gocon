import { BaseConnectionOptions } from '../../connection';
import { CapacitorSQLitePlugin } from 'capacitor-sqlite';

export interface CapacitorSqliteConnectionOptions extends BaseConnectionOptions {
  /**
   * Database type.
   */
  readonly type: 'capacitor-sqlite';

  /**
   * Database name.
   */
  readonly database: string;

  /**
   * The driver object
   */
  readonly driver: CapacitorSQLitePlugin;

  /**
   * The key to use for for using/opening encrypted databases.
   */
  readonly key?: string;

  readonly encryptionMode?: 'encryption' | 'secret' | 'newsecret';
}
