import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientAjouterPageRoutingModule } from './client-ajouter-routing.module';

import { ClientAjouterPage } from './client-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientAjouterPage]
})
export class ClientAjouterPageModule {}
