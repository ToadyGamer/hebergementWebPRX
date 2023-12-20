import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuantiteAjouterPage } from './quantite-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: QuantiteAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuantiteAjouterPageRoutingModule {}
