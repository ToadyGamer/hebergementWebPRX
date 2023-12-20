import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandeAjouterPage } from './demande-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: DemandeAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeAjouterPageRoutingModule {}
