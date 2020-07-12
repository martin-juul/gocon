import { Logger, LogLevel } from '../app/logging';
import { Environment } from '../app/interfaces/environment';
import { AttachmentState } from 'ionic-feedback-module';

export const environment: Environment = {
  production: false,
  logging: {
    logLevels: [
      {
        loggerName: Logger.ROOT,
        logLevel: LogLevel.DEBUG,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
