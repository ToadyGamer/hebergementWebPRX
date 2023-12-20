import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandeModifierPageRoutingModule } from './demande-modifier-routing.module';

import { DemandeModifierPage } from './demande-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DemandeModifierPage]
})
export class DemandeModifierPageModule {}
