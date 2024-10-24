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

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
  ) { 
    this.showLoadingAlert = true;
    this.showErrorAlert = false;
    this.errorMessage = '';
    this.task = new Task();
  }

  async ngOnInit() {
    const taskId = +this.route.snapshot.paramMap.get('id');
    console.log('Task detail ngOnInit', taskId);
    let tasks = await this.storage.get('tasks');
    console.log('Stored tasks', tasks);
  }

  goBackTask() {
    console.log('goBackTask');
    this.router.navigateByUrl('/tasks/tasks');
  }
}
