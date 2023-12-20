import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentePecAjouterPageRoutingModule } from './vente-pec-ajouter-routing.module';

import { VentePecAjouterPage } from './vente-pec-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentePecAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VentePecAjouterPage]
})
export class VentePecAjouterPageModule {}
