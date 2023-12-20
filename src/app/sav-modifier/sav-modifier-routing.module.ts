import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavModifierPage } from './sav-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: SavModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavModifierPageRoutingModule {}
