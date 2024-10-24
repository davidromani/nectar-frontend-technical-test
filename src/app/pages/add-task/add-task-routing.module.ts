import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskPage } from './add-task';

const routes: Routes = [
  {
    path: 'add-tasks',
    component: AddTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksPageRoutingModule { }
