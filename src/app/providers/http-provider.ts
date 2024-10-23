import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './api-manager';

var apiUrl = "https://localhost:4443/api";

var httpLink = {
  getAllTasks: apiUrl + "/tasks",
  deleteTaskyId: apiUrl + "/tasks",
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllTasks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTasks);
  }

  public deleteTaskById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTaskyId + '/' + model, "");
  }
}                          
