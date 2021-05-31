import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  comments$: Observable<Comment[]>;
  post$: Observable<Post>;
  postId: number;
  @Input() body: string;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('postId');
    this.post$ = this.getPost(this.postId);
    this.comments$ = this.getCommentsByPost(this.postId);
  }

  private getPost(postId: number): Observable<Post> {
    return this.postService.getById(postId);
  }

  private getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.commentService.getCommentsByPost(postId);
  }
}
