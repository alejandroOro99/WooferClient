import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username = new FormControl('');
  password1 = new FormControl('');
  password2 = new FormControl('');
  name = new FormControl('');
  email = new FormControl('');
  dob = new FormControl('');
  phone = new FormControl('');

  errorState: boolean = false;
  errorMessage: string = "";

  user: User;

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    this.errorState = false;
    if (this.password1.value !== this.password2.value) {
      this.errorState = true;
      this.errorMessage = "Passwords must match";
    } else if (!this.username.value) {
      this.errorState = true;
      this.errorMessage = "Username is required";
    } else if (!this.password1.value) {
      this.errorState = true;
      this.errorMessage = "Password is required";
    } else if (!this.dob.value) {
      this.errorState = true;
      this.errorMessage = "Date of birth is required";
    } else {
      alert("user created");
    }
  }
}
