import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddTaskPage } from './add-task';
import { TasksPageRoutingModule } from './add-task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule
  ],
  declarations: [
    AddTaskPage,
  ]
})
export class AddTaskModule { }
