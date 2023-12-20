import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentePecModifierPageRoutingModule } from './vente-pec-modifier-routing.module';

import { VentePecModifierPage } from './vente-pec-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentePecModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VentePecModifierPage]
})
export class VentePecModifierPageModule {}
