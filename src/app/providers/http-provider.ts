import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './api-manager';
import { Storage } from '@ionic/storage-angular';

export var apiUrl = "https://localhost:4433/api";

export var httpLink = {
  getAllTasks: apiUrl + "/tasks",
  addTask: apiUrl + "/tasks",
  deleteTaskyId: apiUrl + "/tasks",
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

  async getAllTasks() {
    await this.storage.get('jwt-token').then((value) => {
      console.log('getAllTasks');
      let result = this.webApiService.get(httpLink.getAllTasks, value);
      console.log('result', result);
    });
  }

  public deleteTaskById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTaskyId + '/' + model, "");
  }
}                          
