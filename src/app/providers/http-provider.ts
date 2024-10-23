import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './api-manager';

var apiUrl = "https://localhost:4433/api";

var httpLink = {
  getAllTasks: apiUrl + "/tasks",
  deleteTaskyId: apiUrl + "/tasks",
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public login(username: string, password: string) {
    return this.webApiService.post(apiUrl + '/login_check', {
      username: username,
      password: password
    });
  }

  public getAllTasks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTasks);
  }

  public deleteTaskById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTaskyId + '/' + model, "");
  }
}                          
