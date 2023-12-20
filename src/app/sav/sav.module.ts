import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavPageRoutingModule } from './sav-routing.module';

import { SavPage } from './sav.page';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SavPage]
})
export class SavPageModule {}
