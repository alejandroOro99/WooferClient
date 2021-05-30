import { Component, ElementRef, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { User } from '../user';

/**
 * component for createing a user
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  /**
   * determins wither to display the error tag
   */
  errorState = false;
  /**
   * error that will fill the error tag
   */
  errorMessage = '';

  /**
   * submitting password
   */
  password1: string;
  /**
   * password conformation, intended to block submit when not equal to password1
   */
  password2: string;

  /**
   * user object to submit
   */
  user: User;
  /**
   * idk
   */
  userEmailValidation: User;
  /**
   * idk
   */
  userUsernameValidation: User;

  /**
   * @param signupService injected signup service
   */
  constructor(private signupService: SignupService) {}
  ngOnInit(): void {
    this.user = new User();
  }

  validateCredentials(): void {
    if (
      this.userEmailValidation == null &&
      this.userUsernameValidation == null
    ) {
      this.signupService.addUser(this.user).subscribe((res) => {});
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
