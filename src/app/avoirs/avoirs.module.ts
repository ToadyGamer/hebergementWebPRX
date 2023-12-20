import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvoirsPageRoutingModule } from './avoirs-routing.module';

import { AvoirsPage } from './avoirs.page';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvoirsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AvoirsPage]
})
export class AvoirsPageModule {}
