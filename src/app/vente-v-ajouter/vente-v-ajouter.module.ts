import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenteVAjouterPageRoutingModule } from './vente-v-ajouter-routing.module';

import { VenteVAjouterPage } from './vente-v-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenteVAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VenteVAjouterPage]
})
export class VenteVAjouterPageModule {}
