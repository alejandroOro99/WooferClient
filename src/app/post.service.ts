import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserService } from './logged-user.service';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string;
  private urlS: string;
  constructor(private http: HttpClient, private loggedUser: LoggedUserService) {
    this.url = 'http://localhost:9000/post/';
    this.urlS = 'http://localhost:9000/posts/';
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlS);
  }

  post(body: string): void {
    if (this.loggedUser.name) {
      this.http.post<Post>(this.url, {
        body: `${body}`,
        userId: this.loggedUser.id,
      });
    } else {
      alert('there is no logged user');
    }
  }
}
