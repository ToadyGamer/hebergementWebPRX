import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenteVModifierPageRoutingModule } from './vente-v-modifier-routing.module';

import { VenteVModifierPage } from './vente-v-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenteVModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VenteVModifierPage]
})
export class VenteVModifierPageModule {}
