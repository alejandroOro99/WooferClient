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
  constructor(private http: HttpClient, private loggedUser: LoggedUserService) {
    this.url = 'http://localhost:9000/post';
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}s`);
  }

  post(body: string): Observable<void> {
    if (this.loggedUser.name) {
      return this.http.post<void>(this.url, {
        body: `${body}`,
        userId: this.loggedUser.id,
      });
    } else {
      alert('there is no logged user');
      return new Observable<void>();
    }
  }

  // todo: cleanup this url
  like(postId: number): Observable<number> {
    return this.http.post<number>(
      `http://localhost:9000/like/${this.loggedUser.id}/${postId}`,
      null
    );
  }
}
