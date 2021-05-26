import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../logged-user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements OnInit {
  body: string;
  userExists: boolean;

  constructor(
    private thingThatPosts: PostService,
    private user: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.userExists = !!this.user.name;
  }

  submit(): void {
    this.thingThatPosts.post(this.body);
  }
}
