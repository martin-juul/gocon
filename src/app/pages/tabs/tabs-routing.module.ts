import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { RecentsPage } from '../recents/recents.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recents',
        component: RecentsPage,
        outlet: 'recents'
      },
      {
        path: 'recents/:recentsId',
        loadChildren: () => import('../recents/recents.module').then(m => m.RecentsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
