import { LoggingService } from 'ionic-logging-service';
import { environment } from '../../environments/environment';
import { DatabaseService } from '../providers/database/database.service';

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}
