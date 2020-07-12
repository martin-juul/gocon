import { Logger, LogLevel } from '../app/logging';
import { Environment } from '../app/interfaces/environment';
import { AttachmentState } from 'ionic-feedback-module';

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

  feedback: {
    isEnabled: true,
    appKey: '',
    appSecret: '',
    language: 'en',
    categories: [
      'Issue',
    ],
    attachScreenshot: AttachmentState.Ask,
    attachDeviceInfo: AttachmentState.Yes,
    attachAppInfo: AttachmentState.Yes,
    attachLogMessages: AttachmentState.Yes,
  },
};
