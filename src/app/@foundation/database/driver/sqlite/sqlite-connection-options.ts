import { BaseConnectionOptions } from '../../connection';

/**
 * Sqlite-specific connection options.
 */
export interface SqliteConnectionOptions extends BaseConnectionOptions {

  /**
   * Database type.
   */
  readonly type: 'sqlite';

  /**
   * Storage type or path to the storage.
   */
  readonly database: string;

  /**
   * Encryption key for for SQLCipher.
   */
  readonly key?: string;

  /**
   * Prints protocol details to stdout.
   * (Default: false)
   */
  readonly debug?: boolean;
}