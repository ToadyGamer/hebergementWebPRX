import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenteVPageRoutingModule } from './vente-v-routing.module';

import { VenteVPage } from './vente-v.page';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenteVPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VenteVPage]
})
export class VenteVPageModule {}
