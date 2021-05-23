import { Injectable } from '@angular/core';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loggedUser: LoggedUserService) { }

  public login(username: string, password: string): boolean {
    //temporary login logic
    this.loggedUser.name = "Morgan Freeman";
    return (username === "password" && password === "username");
  }
}
