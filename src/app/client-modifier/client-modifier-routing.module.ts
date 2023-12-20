import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientModifierPage } from './client-modifier.page';

const routes: Routes = [
  {
    path: '',
    component: ClientModifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientModifierPageRoutingModule {}
