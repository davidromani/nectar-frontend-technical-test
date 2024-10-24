import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { httpLink, HttpProviderService } from './http-provider';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.api.getAllTasks();
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;

    // loop through each day in the schedule
    /*this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              const speaker = this.data.speakers.find(
                (s: any) => s.name === speakerName
              );
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }
        });
      });
    });*/

    return this.data;
  }

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

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }
}
