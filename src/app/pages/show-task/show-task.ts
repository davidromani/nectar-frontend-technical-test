import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Task, TasksData } from '../../providers/tasks-data';

@Component({
  selector: 'show-task',
  templateUrl: 'show-task.html',
  styleUrls: ['./show-task.scss'],
})
export class ShowTaskPage {
  task: Task;
  showLoadingAlert: boolean;
  showErrorAlert: boolean;
  errorMessage: string;
  found: boolean;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
    public taskData: TasksData,
  ) { 
    this.showLoadingAlert = true;
    this.showErrorAlert = false;
    this.errorMessage = '';
    this.task = new Task();
    this.found = false;
  }

  async ngOnInit() {
    const taskId = +this.route.snapshot.paramMap.get('id');
    console.log('Task detail ngOnInit', taskId);
    let tasks = await this.storage.get('tasks');
    console.log('Stored tasks', tasks);
    tasks.forEach(item => {
      if (item.id === taskId) {
        this.task.id = item.id;
        this.task.status = item.status;
        this.task.title = item.title;
        this.task.description = item.description;
        this.task.user = item.user;
        this.task.date = item.date;
        this.found = true;
      }
    });
    if (this.found) { 
      this.showLoadingAlert = false;
    } else {
      this.showLoadingAlert = false;
      this.showErrorAlert = true;
      this.errorMessage = 'Task with ID ' + taskId + ' not found';
    }
  }

  async markAsCompletedTask(id: number) {
    console.log('markAsCompletedTask', id);
    let token = await this.storage.get('jwt-token');
    let userId = await this.storage.get('user-id');
    this.showLoadingAlert = true;
    this.task.status = 1;
    this.task.user = '/api/users/' + userId;
    this.taskData.updateTask(this.task, token).subscribe(
      (response) => {
        this.showLoadingAlert = false;
        console.log('Task updated successfully', response);
      },
      (error) => {
        console.error('Error updating task', error);
        this.showLoadingAlert = false;
        this.showErrorAlert = true;
        this.errorMessage = error.statusText;
      }
    );
  }

  goBackTask() {
    console.log('goBackTask');
    this.router.navigateByUrl('/tasks/tasks');
  }
}
