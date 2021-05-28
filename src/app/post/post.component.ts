import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private service: PostService) {}

  ngOnInit(): void {}

  like(): void {
    this.service.like(this.post.id).subscribe((num) => {
      if (num >= 0) this.post.likes = num;
    });
  }
}
