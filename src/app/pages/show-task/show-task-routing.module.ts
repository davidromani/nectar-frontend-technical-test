import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowTask } from './show-task';

const routes: Routes = [
  {
    path: '',
    component: ShowTask
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowTaskPageRoutingModule { }
