import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowTaskPage } from './show-task';

const routes: Routes = [
  {
    path: '',
    component: ShowTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowTaskPageRoutingModule { }
