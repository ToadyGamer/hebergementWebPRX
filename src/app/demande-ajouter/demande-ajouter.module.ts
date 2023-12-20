import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandeAjouterPageRoutingModule } from './demande-ajouter-routing.module';

import { DemandeAjouterPage } from './demande-ajouter.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeAjouterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DemandeAjouterPage]
})
export class DemandeAjouterPageModule {}
