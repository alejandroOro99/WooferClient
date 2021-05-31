import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Post } from '../post';

import { Comment } from '../comment';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

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
  username: string;
  /**
   * id of the logged user
   */
  //userId: number;
  /**
   * weither the user has elected to view this posts comments
   */
  showComments: boolean;
  /**
   * idk
   */
  commentBody: string;
  isLiked: boolean;
  public currentPostId: number;

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
    const likes: number[] = JSON.parse(localStorage.getItem('likes'));
    this.isLiked = !(likes.indexOf(this.post.id) === -1);
  }

  /**
   * runs upon a button press: creates a comment
   */
  public commentBtn(): void {
    //this.addComment(this.commentBody, this.userId, this.post.id);
  }
  /**
   * adds a comment to the database
   * @param body comment body
   * @param userId id of current user
   * @param postId id of relevent post
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
      if (num > 0) {
        this.isLiked = true;
        const likes: number[] = JSON.parse(localStorage.getItem('likes'));
        likes.push(this.post.id);
        localStorage.setItem('likes', JSON.stringify(likes));
        this.post.likes = num;
      }
    });
  }
}
