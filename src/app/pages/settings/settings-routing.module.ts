import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';
import { LogViewerComponent } from './log-viewer/log-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'logs',
    component: LogViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {
}
