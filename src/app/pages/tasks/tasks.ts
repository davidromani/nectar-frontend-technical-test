import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'tasks-list',
  templateUrl: 'tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class TasksPage {

  constructor(
    public userData: UserData,
    public router: Router,
    public storage: Storage,
  ) { 
  }
}
