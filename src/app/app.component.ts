import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { StoreService } from './providers/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storeService: StoreService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const {SplashScreen, StatusBar} = Plugins;
    this.platform.ready().then(() => {
      this.storeService.init().then(async () => {
        if (this.platform.is('hybrid')) {
          await SplashScreen.hide();
          await StatusBar.setStyle({style: StatusBarStyle.Light});
        }
      });
    });
  }
}
