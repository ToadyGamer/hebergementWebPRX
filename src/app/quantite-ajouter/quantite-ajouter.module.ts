import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuantiteAjouterPageRoutingModule } from './quantite-ajouter-routing.module';

import { QuantiteAjouterPage } from './quantite-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuantiteAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuantiteAjouterPage]
})
export class QuantiteAjouterPageModule {}
