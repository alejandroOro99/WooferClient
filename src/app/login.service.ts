import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login(username: string, password: string): boolean {
    //temporary login logic
    return (username === "password" && password === "username");
  }
}
