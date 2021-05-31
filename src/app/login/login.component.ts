import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

interface IUser {
  username: string;
  password: string;
}

/**
 * defines the page in which a login will be recieved
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   * the inputed users username
   */
  username: string;
  /**
   * the inputed users password
   */
  password: string;

  /**
   * weither their has been an error that needs to be given to the user
   */
  errorState = false;
  /**
   * message to display on error
   */
  errorMessage = '';

  /**
   * weither the user has succesfully logged in
   */
  loggedIn: boolean;

  /**
   *
   * @param loginService injectable login service
   * @param router injectable router
   */
  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * runs upon button press: derermins weither the user can be submitted, than submits them
   */
  submit(): void {
    console.log('submit method running');
    if (!this.username) {
      this.errorState = true;
      this.errorMessage = 'Username is required';
    } else if (!this.password) {
      this.errorState = true;
      this.errorMessage = 'Password is required';
    } else {
      const user: IUser = {
        username: this.username,
        password: this.password,
      };

      this.loginService.login(user).subscribe(
        (res) => {
          // localStorage.setItem('username', res.username);
          // localStorage.setItem('name', res.name);
          // localStorage.setItem('id', res.id.toString());
          localStorage.setItem('user', JSON.stringify(res));

          this.loginService.getLikes(res.id).subscribe((x) => {
            localStorage.setItem('likes', JSON.stringify(x));
          });

          //localStorage.setItem('timestamp', res.timestamp.toString());
          this.router.navigate([`${res.username}`]);
        },
        (error) => {
          console.log(`Error recieved from interceptor: ${error}`);
          this.errorMessage = JSON.stringify(error);
          this.errorState = true;
        }
      );
    }
  }
}
