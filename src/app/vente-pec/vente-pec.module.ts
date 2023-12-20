import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentePecPageRoutingModule } from './vente-pec-routing.module';

import { VentePecPage } from './vente-pec.page';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentePecPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VentePecPage]
})
export class VentePecPageModule {}
