import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockAjouterPageRoutingModule } from './stock-ajouter-routing.module';

import { StockAjouterPage } from './stock-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StockAjouterPage]
})
export class StockAjouterPageModule {}
