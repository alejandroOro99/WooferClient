import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

interface IUser {
  username: string;
  password: string;
}

/**
 * Provider for logging in a User
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string;
  /**
   * instantiates the stored url
   */
  constructor(private http: HttpClient) {
    this.urlLogin =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/user/login';
  }

  /**
   * Attempts to verify the user's credentials and, if successful, log them in
   * @param username The username that was entered to be checked by the backend
   * @param password The password that was entered to be checked by the backend
   * @returns The logged in users info
   */
  public login(user: IUser): Observable<User> {
    return this.http.post<User>(this.urlLogin, user);
  }

  public getLikes(userId: number): Observable<number[]> {
    return this.http.get<number[]>(
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/like/' + userId
    );
  }
}
