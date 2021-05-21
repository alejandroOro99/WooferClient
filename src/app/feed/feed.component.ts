import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [
    {
      username: "username",
      name: "name",
      body: "body",
      likes: 4,
      comments: 0
    },
    {
      username: "username2",
      name: "name2",
      body: "body2",
      likes: 8,
      comments: 0
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
