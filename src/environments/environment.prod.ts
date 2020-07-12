import { Environment, Logger, LogLevel } from './environment.model';

export const environment: Environment = {
  production: true,

  logging: {
    logLevels: [
      {
        loggerName: Logger.ROOT,
        logLevel: LogLevel.ERROR,
      },
    ],
  },
};
