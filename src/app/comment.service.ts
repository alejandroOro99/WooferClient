import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';

/**
 * makes all calls to the server for comments
 */
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  /**
   * url for adding a comment
   */
  private urlAddComment: string;
  /**
   * url for retrieving comments
   */
  private urlGetCommentsByPost: string;
  /**
   * instantiates some url variables
   * @param http injected http client
   */
  constructor(private http: HttpClient) {
    this.urlAddComment =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/comment';
    this.urlGetCommentsByPost =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/comment/post/';
  }

  /**
   * adds a comment to the database
   * @param comment the comment object to add
   * @returns http observable: settles request and returns comment
   */
  public addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlAddComment, comment);
  }

  /**
   * finds all pomments of a specific post
   * @param postId id of post
   * @returns http observable: settles request and returns a list of comments
   */
  public getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.urlGetCommentsByPost + postId);
  }
}
