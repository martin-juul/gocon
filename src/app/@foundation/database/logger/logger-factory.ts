import { Logger } from './Logger';
import { LoggerOptions } from './logger-options';
import { SimpleConsoleLogger } from './simple-console-logger';
import { AdvancedConsoleLogger } from './advanced-console-logger';
import { FileLogger } from './file-logger';
import { DebugLogger } from './debug-logger';

/**
 * Helps to create logger instances.
 */
export class LoggerFactory {

  /**
   * Creates a new logger depend on a given connection's driver.
   */
  create(logger?: 'advanced-console' | 'simple-console' | 'file' | 'debug' | Logger, options?: LoggerOptions): Logger {
    if (logger instanceof Object)
      return logger as Logger;

    if (logger) {
      switch (logger) {
        case 'simple-console':
          return new SimpleConsoleLogger(options);

        case 'file':
          return new FileLogger(options);

        case 'advanced-console':
          return new AdvancedConsoleLogger(options);

        case 'debug':
          return new DebugLogger();
      }
    }

    return new AdvancedConsoleLogger(options);
  }

}
