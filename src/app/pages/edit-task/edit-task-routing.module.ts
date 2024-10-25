import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditTaskPage } from './edit-task';

const routes: Routes = [
  {
    path: '',
    component: EditTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTaskPageRoutingModule { }
