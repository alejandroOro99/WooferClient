import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private urlAddComment: string;
  private urlGetCommentsByPost: string;
  constructor(private http: HttpClient) {
    this.urlAddComment = 'http://localhost:9000/comment';
    this.urlGetCommentsByPost = 'http://localhost:9000/comment/post/';
  }

  public addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlAddComment, comment);
  }

  public getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.urlGetCommentsByPost + postId);
  }
}
