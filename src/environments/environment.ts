/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
import { Environment, Logger, LogLevel } from './environment.model';

export const environment: Environment = {
  appName: 'GoCon',
  production: false,
  baseUrls: {
    api: 'https://api.everconnect.dk',
    manager: 'https://manager.everconnect.dk',
    updateService: 'https://download.evercall.dk',
  },
  logging: {
    logLevels: [
      {
        loggerName: Logger.ROOT,
        logLevel: LogLevel.DEBUG,
      },
      {
        loggerName: 'GoCon.LoginPage',
        logLevel: LogLevel.DEBUG,
      },
      {
        loggerName: 'StoreService',
        logLevel: LogLevel.DEBUG,
      },
      {
        loggerName: 'Ionic.Logging.Viewer.Component',
        logLevel: LogLevel.OFF,
      },
      {
        loggerName: 'Ionic.Logging.Viewer.Levels.Component',
        logLevel: LogLevel.OFF,
      },
      {
        loggerName: 'Ionic.Logging.Viewer.Filter.Service',
        logLevel: LogLevel.OFF,
      },
      {
        loggerName: 'Ionic.Logging.Viewer.Search.Component',
        logLevel: LogLevel.OFF,
      }
    ],
    localStorageAppender: {
      localStorageKey: 'gocon.logging',
      threshold: LogLevel.INFO,
      maxMessages: 250,
    },
    browserConsoleAppender: {
      threshold: LogLevel.ALL,
    },
  },
};

