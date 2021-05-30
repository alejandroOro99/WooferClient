import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../logged-user.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  name: string;

  feed: Post[] = [];

  constructor(
    private loggedUser: LoggedUserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    console.log(this.loggedUser.name);
    if (this.loggedUser.name !== undefined) {
      this.name = this.loggedUser.name;
    }

    this.postService.getAll().subscribe((res) => (this.feed = res));
  }
}
