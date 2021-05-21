import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');

  errorState: boolean = false;
  errorMessage: string = "";

  loggedIn: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.username.value) {
      this.errorState = true;
      this.errorMessage = "Username is required";
    } else if (!this.password.value) {
      this.errorState = true;
      this.errorMessage = "Password is required";
    } else {
      if (!this.loginService.login(this.username.value, this.password.value)) {
        this.errorState = true;
        this.errorMessage = "Incorrect Username/Password";
      } else {
        alert("this is where Angular would change to a logged in state");
      }
    }
  }
}
