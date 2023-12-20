import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockModifierPage } from './stock-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: StockModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockModifierPageRoutingModule {}
