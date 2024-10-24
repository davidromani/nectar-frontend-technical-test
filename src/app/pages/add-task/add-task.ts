import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Task, TasksData } from '../../providers/tasks-data';

@Component({
  selector: 'add-task',
  templateUrl: 'add-task.html',
  styleUrls: ['./add-task.scss'],
})
export class AddTaskPage {

  task: Task;
  showLoadingAlert: boolean;
  showErrorAlert: boolean;
  errorMessage: string;

  constructor(
    public taskData: TasksData,
    public router: Router,
    public storage: Storage,
  ) { 
    this.showLoadingAlert = false;
    this.showErrorAlert = false;
    this.errorMessage = '';
    this.task = new Task();
    this.task.title = '';
    this.task.description = '';
    this.task.status = 0;
    this.task.date = '2024-10-24T12:58:39.573Z';
    this.task.user = '/api/users/1';
  }

  async addTask() {
    console.log('addTask');
    let token = await this.storage.get('jwt-token');
    if (this.task.title.trim() && this.task.description.trim()) {
      this.taskData.addTask(this.task, token).subscribe(
        (response) => {
          this.showLoadingAlert = false;
          console.log('Task added successfully', response);
          // After successful task creation, redirect to the tasks list page
          this.router.navigate(['/tasks/tasks']);
        },
        (error) => {
          console.error('Error adding task', error);
          this.showLoadingAlert = false;
          this.showErrorAlert = true;
          this.errorMessage = error.statusText;
        }
      );
    } else {
      console.log('Please fill in all fields');
      this.showLoadingAlert = false;
      this.showErrorAlert = true;
      this.errorMessage = 'Please fill in all fields';
    }
  }

  goBackTask() {
    console.log('goBackTask');
    this.router.navigateByUrl('/tasks/tasks');
  }
}
