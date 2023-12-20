import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentePecPage } from './vente-pec.page';

const routes: Routes = [
  {
    path: '',
    component: VentePecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentePecPageRoutingModule {}
