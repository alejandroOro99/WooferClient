import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Post } from '../post';

import { Comment } from '../comment';
import { LoggedUserService } from '../logged-user.service';
import { PostService } from '../post.service';

/**
 * displays a single post
 */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  /**
   * the post to display
   */
  @Input() post: Post;
  /**
   * id of the logged user
   */
  userId: number;
  /**
   * weither the user has elected to view this posts comments
   */
  showComments: boolean;
  /**
   * idk
   */
  commentBody: string;

  /**
   * @param commentService injected comment service
   * @param loggedUser injected logged user service
   * @param service injected post service
   */
  constructor(
    private commentService: CommentService,
    private loggedUser: LoggedUserService,
    private service: PostService
  ) {}

  /**
   * fetches the logged users id
   */
  ngOnInit(): void {
    this.userId = this.loggedUser.id;
  }

  /**
   * runs upon a button press: creates a comment
   */
  public commentBtn(): void {
    this.addComment(this.commentBody, this.userId, this.post.id);
  }

  /**
   * adds a comment to the database
   * @param body comment body
   * @param userId id of current user
   * @param postId id of relevent post (why is this a parameter when you can grab it as a attribute?)
   */
  private addComment(body: string, userId: number, postId: number): void {
    const newComment = new Comment(body, postId, userId);
    this.commentService.addComment(newComment).subscribe((res) => {});
  }

  /**
   * runs upon button press: likes a post
   */
  like(): void {
    this.service.like(this.post.id).subscribe((num) => {
      if (num >= 0) {
        this.post.likes = num;
      }
    });
  }
}
