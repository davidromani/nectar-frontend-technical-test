import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditTaskPage } from './edit-task';
import { EditTaskPageRoutingModule } from './edit-task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTaskPageRoutingModule
  ],
  declarations: [
    EditTaskPage,
  ]
})
export class EditTaskModule { }
