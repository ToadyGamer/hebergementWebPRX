import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentePecModifierPage } from './vente-pec-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: VentePecModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentePecModifierPageRoutingModule {}
