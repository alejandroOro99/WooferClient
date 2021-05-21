import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  errorState: boolean = false;
  errorMessage: string = "";

  loggedIn: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.username) {
      this.errorState = true;
      this.errorMessage = "Username is required";
    } else if (!this.password) {
      this.errorState = true;
      this.errorMessage = "Password is required";
    } else {
      if (!this.loginService.login(this.username, this.password)) {
        this.errorState = true;
        this.errorMessage = "Incorrect Username/Password";
      } else {
        alert("this is where Angular would change to a logged in state");
      }
    }
  }
}
