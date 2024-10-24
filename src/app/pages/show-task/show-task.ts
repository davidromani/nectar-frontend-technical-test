import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../providers/tasks-data';

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

  goBackTask() {
    console.log('goBackTask');
    this.router.navigateByUrl('/tasks/tasks');
  }
}
