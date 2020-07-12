import { LoggingServiceConfiguration } from 'ionic-logging-service';
import { FeedbackConfiguration } from 'ionic-feedback-module';

export interface Environment {
  production: boolean;
  logging: LoggingServiceConfiguration;
  feedback: FeedbackConfiguration;
}
