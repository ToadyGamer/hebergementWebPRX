import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavModifierPageRoutingModule } from './sav-modifier-routing.module';

import { SavModifierPage } from './sav-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SavModifierPage]
})
export class SavModifierPageModule {}
