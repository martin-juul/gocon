import { SqliteConnectionOptions } from '../driver/sqlite';
import { CordovaConnectionOptions } from '../driver/cordova';
import { SqljsConnectionOptions } from '../driver/sqljs';
import { NativescriptConnectionOptions } from '../driver/nativescript';
import { ExpoConnectionOptions } from '../driver/expo';
import { CapacitorSqliteConnectionOptions } from '../driver/capacitor-sqlite/capacitor-sqlite-connection-options';

/**
 * ConnectionOptions is an interface with settings and options for specific connection.
 * Options contain database and other connection-related settings.
 * Consumer must provide connection options for each of your connections.
 */
export type ConnectionOptions =
  CapacitorSqliteConnectionOptions |
  SqliteConnectionOptions |
  CordovaConnectionOptions |
  NativescriptConnectionOptions |
  SqljsConnectionOptions |
  ExpoConnectionOptions;
