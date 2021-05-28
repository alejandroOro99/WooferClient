import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggedUserService } from './logged-user.service';
import { User } from './user';

interface IUser {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string;

  constructor(private http: HttpClient) {
    this.urlLogin = 'http://localhost:9000/user/login';
  }

  public login(user: IUser): Observable<User> {
    return this.http.post<User>(this.urlLogin, user);
  }
}

//Mish's Code
// export class LoginService {
//   constructor(private loggedUser: LoggedUserService) {}

//   public login(username: string, password: string): boolean {
//     // temporary login logic
//     this.loggedUser.name = 'Morgan Freeman';
//     return username === 'password' && password === 'username';
//   }
// }
