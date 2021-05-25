import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from '../logged-user.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  errorState = false;
  errorMessage = '';

  loggedIn: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loggedUser: LoggedUserService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    if (!this.username) {
      this.errorState = true;
      this.errorMessage = 'Username is required';
    } else if (!this.password) {
      this.errorState = true;
      this.errorMessage = 'Password is required';
    } else {
      if (!this.loginService.login(this.username, this.password)) {
        this.errorState = true;
        this.errorMessage = 'Incorrect Username/Password';
      } else {
        this.router.navigate(['mainPage']);
      }
    }
  }
}
