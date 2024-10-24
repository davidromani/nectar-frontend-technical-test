import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule)
  },
  {
    path: 'show-task/:id',
    loadChildren: () => import('./pages/show-task/show-task.module').then(m => m.ShowTaskModule)
  },
  {
    path: 'edit-task/:id',
    loadChildren: () => import('./pages/edit-task/edit-task.module').then(m => m.EditTaskModule)
  },
  /*{
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canMatch: [checkTutorialGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
