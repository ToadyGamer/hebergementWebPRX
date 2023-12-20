import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockModifierPageRoutingModule } from './stock-modifier-routing.module';

import { StockModifierPage } from './stock-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StockModifierPage]
})
export class StockModifierPageModule {}
