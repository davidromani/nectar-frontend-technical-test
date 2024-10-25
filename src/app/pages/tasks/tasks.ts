import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
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
    private taskData: TasksData,
    private router: Router,
    private storage: Storage,
    private actionSheetController: ActionSheetController,
  ) { 
    this.tasks = [];
    this.showLoadingAlert = true;
    this.showErrorAlert = false;
    this.errorMessage = '';
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  async loadTasks() {
    let token = await this.storage.get('jwt-token');
    console.log('TOKEN', token);
    this.taskData.getTasks(token).subscribe(
      (response: any) => {
        this.tasks = [];
        this.showLoadingAlert = false;
        console.log('response', response.body);
        response.body.member.forEach(item => {
          let task = new Task();
          task.id = item.id;
          task.status = item.status;
          task.title = item.title;
          task.description = item.description;
          task.user = item.user;
          task.date = item.date;
          this.tasks.push(task);
        });
        this.storage.set('tasks', this.tasks);
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

  showTask(id: number) {
    console.log('showTask', id);
    this.router.navigateByUrl('/show-task/' + id);
  }

  editTask(id: number) {
    console.log('editTask', id);
    this.router.navigateByUrl('/edit-task/' + id);
  }

  async markAsCompletedTask(id: number) {
    console.log('markAsCompletedTask', id);
    let token = await this.storage.get('jwt-token');
    let userId = await this.storage.get('user-id');
    this.showLoadingAlert = true;
    let found = false;
    let task = new Task();
    this.tasks.forEach(item => {
      if (item.id === id) {
        found = true;
        task.id = item.id;
        task.status = 1;
        task.title = item.title;
        task.description = item.description;
        task.date = item.date;
      }
    });
    if (found) {
      task.user = '/api/users/' + userId;
      this.taskData.updateTask(task, token).subscribe(
        (response) => {
          this.showLoadingAlert = false;
          console.log('Task updated successfully', response);
          location.reload();
        },
        (error) => {
          console.error('Error updating task', error);
          this.showLoadingAlert = false;
          this.showErrorAlert = true;
          this.errorMessage = error.statusText;
        }
      );
    } else {
      this.showLoadingAlert = false;
      this.showErrorAlert = true;
      this.errorMessage = 'No task to mark as completed found';
    }
  }

  async presentDeleteActionSheet(taskId: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm Delete',
      subHeader: 'Are you sure you want to delete this task?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteTask(taskId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        },
      ],
    });
    await actionSheet.present();
  }

  async deleteTask(id: number) {
    console.log('deleteTask', id);
    let token = await this.storage.get('jwt-token');
    this.taskData.deleteTask(id, token).subscribe(
      (response: any) => {
        this.showLoadingAlert = false;
        console.log('response', response.body);
        location.reload();
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
