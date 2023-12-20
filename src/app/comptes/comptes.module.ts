import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComptesPageRoutingModule } from './comptes-routing.module';

import { ComptesPage } from './comptes.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ComptesPage]
})
export class ComptesPageModule {}
