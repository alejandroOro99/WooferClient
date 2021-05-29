import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Post } from '../post';

import { Comment } from '../comment';
import { LoggedUserService } from '../logged-user.service';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() postId: Post;
  userId: number;
  showComments: boolean;
  commentBody: string;
  public currentPostId: number;

  constructor(
    private commentService: CommentService,
    private loggedUser: LoggedUserService,
    private service: PostService
  ) {}
  ngOnInit(): void {
    this.userId = this.loggedUser.id;
  }

  public commentBtn() {
    console.log(this.commentBody);
    this.addComment(this.commentBody, this.userId, this.post.id);
  }
  private addComment(body: string, userId: number, postId: number) {
    let newComment = new Comment(body, postId, userId);
    this.commentService.addComment(newComment).subscribe((res) => {});
  }
  like(): void {
    this.service.like(this.post.id).subscribe((num) => {
      if (num >= 0) this.post.likes = num;
    });
  }
}
