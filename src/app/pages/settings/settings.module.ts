import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { LoggingViewerModule } from 'ionic-logging-viewer';

@NgModule({
  declarations: [
    SettingsPage,
    LogViewerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoggingViewerModule,
    SettingsPageRoutingModule
  ],
})
export class SettingsPageModule {}
