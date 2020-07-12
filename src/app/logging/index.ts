import { LoggingService } from 'ionic-logging-service';
import { environment } from '../../environments/environment';

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}
