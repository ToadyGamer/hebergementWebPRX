import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChiffreAffairePageRoutingModule } from './chiffre-affaire-routing.module';

import { ChiffreAffairePage } from './chiffre-affaire.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChiffreAffairePageRoutingModule,
    NgChartsModule
  ],
  declarations: [ChiffreAffairePage]
})
export class ChiffreAffairePageModule {}
