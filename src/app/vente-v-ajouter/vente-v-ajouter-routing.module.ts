import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenteVAjouterPage } from './vente-v-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: VenteVAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenteVAjouterPageRoutingModule {}
