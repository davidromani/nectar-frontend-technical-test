import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  showLoadingAlert: boolean;
  showErrorAlert: boolean;
  errorMessage: string;

  constructor(
    private userData: UserData,
    private router: Router,
    private storage: Storage,
  ) { 
    this.storage.create();
    this.showLoadingAlert = false;
    this.showErrorAlert = false;
    this.errorMessage = '';
  }

  async onLogin(form: NgForm) {
    console.log('onLogin');
    this.submitted = true;
    this.userData.login(this.login.username, this.login.password).subscribe((result) => {
      console.log('R', result);
      this.storage.set('jwt-token', result.body.token);
      this.storage.set('user-id', result.body.id);
      this.storage.set('user-name', result.body.name);
      this.storage.set('user-email', result.body.email);
      this.showErrorAlert = false;
      this.errorMessage = '';
      this.router.navigateByUrl('/tasks/tasks');
    },
    (error) => {
      console.error('error', error.statusText);
      this.showErrorAlert = true;
      this.errorMessage = error.statusText;
    });

    /*this.userData.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.router.navigate(['/home']); // Navigate to the home page after login
      }
    });

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password);
      console.log(this.login.username, this.login.password);
      this.router.navigateByUrl('/app/tabs/schedule');
    }*/
  }
}
