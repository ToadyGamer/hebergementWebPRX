import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteModifierPageRoutingModule } from './compte-modifier-routing.module';

import { CompteModifierPage } from './compte-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompteModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompteModifierPage]
})
export class CompteModifierPageModule {}
