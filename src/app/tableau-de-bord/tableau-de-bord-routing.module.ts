import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableauDeBordPage } from './tableau-de-bord.page';

const routes: Routes = [
  {
    path: '',
    component: TableauDeBordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableauDeBordPageRoutingModule {}
