import { LoggingServiceConfiguration } from 'ionic-logging-service';

export enum LogLevel {
  ALL = 'ALL',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  INFO = 'INFO',
  OFF = 'OFF',
  TRACE = 'TRACE',
  WARN = 'WARN'
}

export enum Logger {
  ROOT = 'root',
}

export interface Environment {
  production: boolean;
  logging: LoggingServiceConfiguration;
}
