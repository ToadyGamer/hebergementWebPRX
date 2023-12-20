import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteAjouterPageRoutingModule } from './compte-ajouter-routing.module';

import { CompteAjouterPage } from './compte-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompteAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompteAjouterPage]
})
export class CompteAjouterPageModule {}
