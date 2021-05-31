import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

/**
 * makes api calls for signup
 */
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  /**
   * url for retrieving a user by email
   */
  private urlGetUserByEmail: string;
  /**
   * url for adding a user
   */
  private urlAddUser: string;
  /**
   * url for fetching a user by their username
   */
  private urlGetUserByUsername: string;

  /**
   * instantiates all urls
   * @param http injected http client
   */
  constructor(private http: HttpClient) {
    this.urlAddUser =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/user/add';
    this.urlGetUserByEmail =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/user/email/';
    this.urlGetUserByUsername =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/user/username/';
  }

  /**
   * adds a user
   * @param user user to add
   * @returns observable that returns the added user upon resolution
   */
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlAddUser, user);
  }

  /**
   * fetches a user with a specified email
   * @param email email to search with
   * @returns observable that returns the found user upon resolution
   */
  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.urlGetUserByEmail + email);
  }

  /**
   * fetches a user with a specified username
   * @param username username to search with
   * @returns observable that returns the found user upon resolution
   */
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.urlGetUserByUsername + username);
  }
}
