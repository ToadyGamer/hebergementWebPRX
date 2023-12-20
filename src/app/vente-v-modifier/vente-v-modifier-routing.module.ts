import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenteVModifierPage } from './vente-v-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: VenteVModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenteVModifierPageRoutingModule {}
