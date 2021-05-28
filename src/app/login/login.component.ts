import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from '../logged-user.service';
import { LoginService } from '../login.service';

interface IUser {
  username: string;
  password: string;
}

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
      let user: IUser = {
        username: this.username,
        password: this.password,
      };

      this.loginService.login(user).subscribe(
        (res) => {
          this.loggedUser.username = res.username;
          this.loggedUser.name = res.name;
          this.loggedUser.id = res.id;

          this.router.navigate(['mainPage']);
        },
        (error) => {
          console.log(`Error recieved from interceptor: ${error}`);
          this.errorMessage = error;
          this.errorState = true;
        }
      );
    }
  }
}
