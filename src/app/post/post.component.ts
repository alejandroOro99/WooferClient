import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from '../comment.service';
import { Post } from '../post';

import { Comment } from '../comment';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  @Input() userId: number;
  @Output() postDeleted = new EventEmitter<Post>();
  username: string;
  /**
   * id of the logged user
   */
  // userId: number;
  /**
   * weither the user has elected to view this posts comments
   */
  showComment: boolean;
  /**
   * idk
   */
  commentBody: string;
  isLiked: boolean;
  personalPost: boolean;
  public currentPostId: number;
  public totalComments: number;
  @Input() isMainPage: boolean;

  public timestamp: Date;
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  /**
   * @param commentService injected comment service
   * @param service injected post service
   */
  constructor(
    private commentService: CommentService,
    private service: PostService,
    private route: ActivatedRoute
  ) {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  /**
   * fetches the logged users id
   */
  ngOnInit(): void {
    // this.userId = Number(localStorage.getItem('id'));
    this.timestamp = new Date(this.post.timestamp);
    this.personalPost =
      this.post.userId === JSON.parse(localStorage.getItem('user')).id;
    this.amILiked();
  }

  remPost(): void {
    this.service.remPost(this.post.id).subscribe(() => this.postDeleted.emit());
  }

  private amILiked(): void {
    const likes: number[] = JSON.parse(localStorage.getItem('likes'));
    this.showComment = false;
    if (likes) {
      this.isLiked = !(likes.indexOf(this.post.id) === -1);
    }
  }

  /**
   * runs upon a button press: creates a comment
   */
  public showComments(): void {
    this.showComment = !this.showComment;
    console.log(this.showComment);
  }

  public commentBtn(): void {
    this.addComment(this.commentBody, this.userId, this.post.id);
    this.showComment = !this.showComment;
  }
  /**
   * adds a comment to the database
   * @param body comment body
   * @param userId id of current user
   * @param postId id of relevent post
   */
  private addComment(body: string, userId: number, postId: number): void {
    const newComment = new Comment(body, postId, userId);
    console.log(newComment);
    this.commentService.addComment(newComment).subscribe((res) => {
      this.getCommentsByPost();
    });
  }

  getCommentsByPost(): void {
    this.commentService.getCommentsByPost(this.post.id).subscribe((res) => {
      this.totalComments = res.length;
    });
  }
  /**
   * runs upon button press: likes a post
   */
  like(): void {
    this.service.like(this.post.id).subscribe((num) => {
      if (num > 0) {
        this.service.refreshLikes().subscribe(() => {
          this.post.likes = num;
          this.amILiked();
        });
      }
    });
  }

  unLike(): void {
    this.service.unLike(this.post.id).subscribe((num) => {
      this.service.refreshLikes().subscribe(() => {
        this.post.likes = num;
        this.amILiked();
      });
    });
  }
}
