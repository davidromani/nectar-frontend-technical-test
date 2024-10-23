import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpProviderService } from './http-provider';
import { BehaviorSubject } from 'rxjs';
//import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  private tokenKey = 'jwt-token';
  private authState = new BehaviorSubject(false);

  constructor(
    public storage: Storage,
    public api: HttpProviderService,
  ) { 
    this.storage.create();
    this.checkToken();
  }

  async checkToken() {
    const token = await this.storage.get(this.tokenKey);
    if (token) {
      //const decoded = jwtDecode(token);
      const decoded = 'CHANGEME';
      const isExpired = this.isTokenExpired(decoded);
      if (!isExpired) {
        this.authState.next(true);
      } else {
        await this.storage.remove(this.tokenKey);
      }
    }
  }

  private isTokenExpired(token: any) {
    const now = Math.floor(new Date().getTime() / 1000);
    return token.exp < now;
  }

  isAuthenticated() {
    return this.authState.asObservable();
  }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string, password: string): Promise<any> {
    console.log('user-data login', username, password);
    let result = this.api.login(username, password).subscribe(async (res) => {
      if (res.token) {
        await this.storage.set(this.tokenKey, res.token);
        this.authState.next(true);
      }
    });
    console.log(result);

    return;
    /*return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });*/
  }

  async logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
      this.storage.remove(this.tokenKey);
      this.authState.next(false);
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}