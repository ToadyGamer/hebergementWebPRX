import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockAjouterPage } from './stock-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: StockAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockAjouterPageRoutingModule {}
