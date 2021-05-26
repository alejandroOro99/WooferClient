import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorState = false;
  errorMessage = '';

  password1: string;
  password2: string;

  user: User;
  userEmailValidation: User;
  userUsernameValidation: User;

  constructor(private signupService: SignupService) {
    this.user = new User();
  }

  ngOnInit(): void {}

  validateCredentials(): void {
    if (
      this.userEmailValidation == null &&
      this.userUsernameValidation == null
    ) {
      this.signupService.addUser(this.user).subscribe((res) => {
        this.user = new User();
      });
      alert('user created');
    } else {
      if (this.userEmailValidation == null) {
        alert('Username already in use');
      } else if (this.userUsernameValidation == null) {
        alert('Email already in use');
      } else {
        alert('Username and email already in use');
      }
    }
  }

  getUserByEmail(user: User): void {
    this.signupService.getUserByEmail(user.email).subscribe((res) => {
      this.userEmailValidation = res;
      this.validateCredentials();
    });
  }

  getUserByUserame(user: User): void {
    this.signupService.getUserByUsername(user.username).subscribe((res) => {
      this.userUsernameValidation = res;
      this.getUserByEmail(user);
    });
  }

  submit(): void {
    this.errorState = false;
    if (this.password1 !== this.password2) {
      this.errorState = true;
      this.errorMessage = 'Passwords must match';
    } else if (!this.user.username) {
      this.errorState = true;
      this.errorMessage = 'Username is required';
    } else if (!this.password1) {
      this.errorState = true;
      this.errorMessage = 'Password is required';
    } else if (!this.user.dob) {
      this.errorState = true;
      this.errorMessage = 'Date of birth is required';
    } else {
      this.user.password = this.password1;
      // Method flow: getUserByUsername->getUserByEmail->validateCredentials
      this.getUserByUserame(this.user);
    }
  }
}
