export interface Logger {

  debug(message: string, context?: object);

  info(message: string, context?: object);

  error(message: string, context?: object);

  warn(message: string, context?: object);

}