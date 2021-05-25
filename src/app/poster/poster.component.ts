import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements OnInit {
  body: string;

  constructor(private thingThatPosts: PostService) {}

  ngOnInit(): void {}

  submit(): void {
    this.thingThatPosts.post(this.body);
  }
}
