import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientModifierPageRoutingModule } from './client-modifier-routing.module';

import { ClientModifierPage } from './client-modifier.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientModifierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientModifierPage]
})
export class ClientModifierPageModule {}
