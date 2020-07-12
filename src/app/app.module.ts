import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggingService } from 'ionic-logging-service';
import { configureLogging } from './logging';
import { LoggingViewerModule } from 'ionic-logging-viewer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoggingViewerModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {deps: [LoggingService], multi: true, provide: APP_INITIALIZER, useFactory: configureLogging},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
