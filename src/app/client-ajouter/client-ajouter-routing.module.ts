import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientAjouterPage } from './client-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: ClientAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAjouterPageRoutingModule {}
