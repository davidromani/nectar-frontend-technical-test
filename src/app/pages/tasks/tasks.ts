import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Task, TasksData } from '../../providers/tasks-data';

@Component({
  selector: 'tasks-list',
  templateUrl: 'tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class TasksPage {

  tasks: Task[] = [];
  showLoadingAlert: boolean;
  showErrorAlert: boolean;
  errorMessage: string;

  constructor(
    public taskData: TasksData,
    public router: Router,
    public storage: Storage,
  ) { 
    this.showLoadingAlert = true;
    this.showErrorAlert = false;
    this.errorMessage = '';
  }

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    let token = await this.storage.get('jwt-token');
    console.log('TOKEN', token);
    /*let response = this.taskData.getTasks(token);
    console.log('response', response);*/
    this.taskData.getTasks(token).subscribe(
      (response: any) => {
        this.showLoadingAlert = false;
        //this.tasks = response;
        console.log('response', response.body);
        response.body.member.forEach(item => {
          let task = new Task();
          task.id = item.id;
          task.status = item.status;
          task.title = item.title;
          task.description = item.description;
          this.tasks.push(task);
        });
      },
      (error) => {
        console.error('Error fetching tasks', error);
        this.showLoadingAlert = false;
        this.showErrorAlert = true;
        this.errorMessage = error.statusText;
      }
    );
  }

  addTask() {
    console.log('addTask');
    this.router.navigateByUrl('/add-task');
  }

  editTask(id: number) {
    console.log('editTask', id);
  }

  async deleteTask(id: number) {
    console.log('deleteTask', id);
    let token = await this.storage.get('jwt-token');
    this.taskData.deleteTask(id, token).subscribe(
      (response: any) => {
        this.showLoadingAlert = false;
        //this.tasks = response;
        console.log('response', response.body);
        location.reload();
        /*response.body.member.forEach(item => {
          let task = new Task();
          task.id = item.id;
          task.status = item.status;
          task.title = item.title;
          task.description = item.description;
          this.tasks.push(task);
        });*/
      },
      (error) => {
        console.error('Error deleting task', error);
        this.showLoadingAlert = false;
        this.showErrorAlert = true;
        this.errorMessage = error.statusText;
      }
    );
  }
}
