import { LoggingService } from 'ionic-logging-service';
import { environment } from '../../environments/environment';

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}

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
