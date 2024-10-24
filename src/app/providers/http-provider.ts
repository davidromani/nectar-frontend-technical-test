import { Injectable } from '@angular/core';
import { WebApiService } from './api-manager';
import { Storage } from '@ionic/storage-angular';

export var apiUrl = "https://localhost:4433/api";

export var httpLink = {
  getAllTasks: apiUrl + "/tasks",
  addTask: apiUrl + "/tasks",
  deleteTaskById: apiUrl + "/tasks/",
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(
    private webApiService: WebApiService,
    public storage: Storage,
  ) { }

  public login(username: string, password: string) {
    return this.webApiService.post(apiUrl + '/login_check', {
      username: username,
      password: password
    });
  }
}                          
