import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { User } from '../user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  comments: Comment[];
  @Input() postId: number;
  @Input() body: string;
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    console.log(this.postId);
    this.getCommentsByPost(this.postId);
  }

  private getCommentsByPost(postId: number): void {
    this.commentService.getCommentsByPost(postId).subscribe((res) => {
      this.comments = res;
      console.log(this.comments);
    });
  }
}
