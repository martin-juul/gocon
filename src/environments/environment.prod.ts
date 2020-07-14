import { Environment, Logger, LogLevel } from './environment.model';

export const environment: Environment = {
  appName: 'GoCon',
  production: true,
  baseUrls: {
    api: 'https://api.everconnect.dk',
    manager: 'https://manager.everconnect.dk',
    updateService: 'https://download.evercall.dk',
  },
  logging: {
    logLevels: [
      {
        loggerName: Logger.ROOT,
        logLevel: LogLevel.ERROR,
      },
    ],
  },
};
