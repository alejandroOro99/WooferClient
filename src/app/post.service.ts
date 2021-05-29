import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserService } from './logged-user.service';
import { Post } from './post';

/**
 * makes all api calls for posts
 */
@Injectable({
  providedIn: 'root',
})
export class PostService {
  /**
   * url for makeing post calls
   */
  private url: string;
  /**
   * @param http injected http client
   * @param loggedUser injected logged user
   */
  constructor(private http: HttpClient, private loggedUser: LoggedUserService) {
    this.url = 'http://localhost:9000/post';
  }

  /**
   * retrieves all of the posts
   * @returns observable that retrieves a list of all posts upon completion
   */
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}s`);
  }

  /**
   * adds a post to the database
   * @param body body of the post
   * @returns observable that returns nothing upon completion
   */
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

  /**
   * likes a post
   * @param postId id of post to like
   * @returns observable that returns the number of total likes for relevent post upon completion
   */
  like(postId: number): Observable<number> {
    return this.http.post<number>(
      `http://localhost:9000/like/${this.loggedUser.id}/${postId}`,
      null
    );
  }
}
