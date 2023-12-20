import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenteVPage } from './vente-v.page';

const routes: Routes = [
  {
    path: '',
    component: VenteVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenteVPageRoutingModule {}
