import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChiffreAffairePage } from './chiffre-affaire.page';

const routes: Routes = [
  {
    path: '',
    component: ChiffreAffairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChiffreAffairePageRoutingModule {}
