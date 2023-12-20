import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentePecAjouterPage } from './vente-pec-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: VentePecAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentePecAjouterPageRoutingModule {}
