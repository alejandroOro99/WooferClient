import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private urlAddUser: string;
  constructor(private http: HttpClient) {
    this.urlAddUser = 'http://localhost:9000/user/add';
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlAddUser, user);
  }
}
