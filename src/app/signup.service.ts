import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private urlGetUserByEmail: string;
  private urlAddUser: string;
  private urlGetUserByUsername: string;

  constructor(private http: HttpClient) {
    this.urlAddUser = 'http://localhost:9000/user/add';
    this.urlGetUserByEmail = 'http://localhost:9000/user/email/';
    this.urlGetUserByUsername = 'http://localhost:9000/user/username/';
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlAddUser, user);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.urlGetUserByEmail + email);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.urlGetUserByUsername + username);
  }
}
