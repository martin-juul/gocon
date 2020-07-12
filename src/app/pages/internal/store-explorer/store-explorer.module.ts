import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreExplorerPageRoutingModule } from './store-explorer-routing.module';

import { StoreExplorerPage } from './store-explorer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreExplorerPageRoutingModule
  ],
  declarations: [StoreExplorerPage]
})
export class StoreExplorerPageModule {}
