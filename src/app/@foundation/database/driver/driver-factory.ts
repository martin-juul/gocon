import { MissingDriverError } from '../error';
import { SqliteDriver } from './sqlite/sqlite-driver';
import { CordovaDriver } from './cordova/cordova-driver';
import { NativescriptDriver } from './nativescript/nativescript-driver';
import { SqljsDriver } from './sqljs/sqljs-driver';
import { ExpoDriver } from './expo/expo-driver';
import { Driver } from './driver';
import { Connection } from '../connection/connection';

/**
 * Helps to create drivers.
 */
export class DriverFactory {

  /**
   * Creates a new driver depend on a given connection's driver type.
   */
  create(connection: Connection): Driver {
    const {type} = connection.options;
    switch (type) {
      case 'sqlite':
        return new SqliteDriver(connection);
      case 'cordova':
        return new CordovaDriver(connection);
      case 'nativescript':
        return new NativescriptDriver(connection);
      case 'sqljs':
        return new SqljsDriver(connection);
      case 'expo':
        return new ExpoDriver(connection);
      default:
        throw new MissingDriverError(type);
    }
  }

}
