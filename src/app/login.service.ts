import { Injectable } from '@angular/core';
import { LoggedUserService } from './logged-user.service';

/**
 * Provider for logging in a User
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /**
   *
   * @param loggedUser The Service that will save the logged in user's info
   */
  constructor(private loggedUser: LoggedUserService) {}

  /**
   * Attempts to verify the user's credentials and, if successful, log them in
   * @param username The username that was entered to be checked by the backend
   * @param password The password that was entered to be checked by the backend
   * @returns
   */
  public login(username: string, password: string): boolean {
    // temporary login logic
    this.loggedUser.name = 'Morgan Freeman';
    return username === 'password' && password === 'username';
  }
}
