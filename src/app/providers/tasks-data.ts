import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { httpLink, HttpProviderService } from './http-provider';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Task {
  id: number;
  status: number;
  title: String;
  description: String;
  date: String;
  user: String;
}

@Injectable({
  providedIn: 'root'
})
export class TasksData {
  data: any;

  constructor(
    private http: HttpClient,
    public storage: Storage,
    public api: HttpProviderService,
  ) {}

  getTasks(token: string): Observable<Task[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/ld+json',
        'Authorization': 'Bearer ' + token
      }),
      mode: 'cors',
      observe: "response" as 'body'
    };
    
    return this.http.get<Task[]>(httpLink.getAllTasks, httpOptions);
  }

  addTask(task: Task, token: string): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/ld+json',
        'Authorization': 'Bearer ' + token
      }),
      mode: 'cors',
      observe: "response" as 'body'
    };
    
    return this.http.post<Task>(httpLink.addTask, task, httpOptions);
  }

  deleteTask(id: number, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/ld+json',
        'Authorization': 'Bearer ' + token
      }),
      mode: 'cors',
      observe: "response" as 'body'
    };
    
    return this.http.delete<Task>(httpLink.deleteTaskById + id, httpOptions);
  }
}
