import { AfterViewInit, Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { DatabaseService } from './providers/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(
    private platform: Platform,
    private database: DatabaseService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const {SplashScreen, StatusBar} = Plugins;
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        await SplashScreen.hide();
        await StatusBar.setStyle({style: StatusBarStyle.Light});
      }
    });
  }

  ngAfterViewInit() {
    this.database.openConnection()
      .then(() => console.log('[App]: Db open'))
      .catch((e) => console.log('[App]: Db open error', e));
  }
}
