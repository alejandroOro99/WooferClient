import { Injectable } from '@angular/core';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private loggedUser: LoggedUserService) {}

  post(body: string) {
    if (this.loggedUser.name) {
      alert(
        'this is where the post will be submitted with user: ' +
          this.loggedUser.name
      );
    } else {
      alert('there is no logged user');
    }
  }
}
