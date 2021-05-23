import { Component, OnInit } from '@angular/core';
import { PostingService } from '../posting.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements OnInit {
  body: string;

  constructor(private thingThatPosts: PostingService) {}

  ngOnInit(): void {}

  submit() {
    this.thingThatPosts.post(this.body);
  }
}
