import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowTaskPage } from './show-task';
import { ShowTaskPageRoutingModule } from './show-task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowTaskPageRoutingModule
  ],
  declarations: [
    ShowTaskPage,
  ]
})
export class ShowTaskModule { }
