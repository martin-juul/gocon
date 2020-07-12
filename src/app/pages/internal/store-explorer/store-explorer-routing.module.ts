import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreExplorerPage } from './store-explorer.page';

const routes: Routes = [
  {
    path: '',
    component: StoreExplorerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreExplorerPageRoutingModule {}
