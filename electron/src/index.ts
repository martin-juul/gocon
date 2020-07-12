import { app } from 'electron';
import { createCapacitorElectronApp } from '@capacitor-community/electron-core';
import * as Sentry from '@sentry/electron';

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();

Sentry.init({dsn: 'https://08b788cb163243bab27624fe106b92ad@o132444.ingest.sentry.io/5331735'});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', () => {
  myCapacitorApp.init();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow() === null) {
    myCapacitorApp.init();
  }
});

// Define any IPC or other custom functionality below here
