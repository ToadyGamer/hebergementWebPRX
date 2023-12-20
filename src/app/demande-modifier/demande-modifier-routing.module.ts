import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandeModifierPage } from './demande-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: DemandeModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeModifierPageRoutingModule {}
