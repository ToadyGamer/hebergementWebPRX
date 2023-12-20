import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StocksPageRoutingModule } from './stocks-routing.module';

import { StocksPage } from './stocks.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StocksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StocksPage]
})
export class StocksPageModule {}
