import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../logged-user.service';
import { Post } from '../post';
import { PostService } from '../post.service';

/**
 * page routed to after successfull login, by default displays all posts
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  /**
   * name of the loggedin user
   */
  name: string;

  /**
   * list of posts that will be displayed
   */
  feed: Post[] = [];

  /**
   *
   * @param loggedUser injected logged user service
   * @param postService injected post service
   */
  constructor(
    private loggedUser: LoggedUserService,
    private postService: PostService
  ) {}

  /**
   * fetches the logged users name than fetches all posts
   */
  ngOnInit(): void {

    if (this.loggedUser.name !== undefined) {
      this.name = this.loggedUser.name;
    }

    this.postService.getAll().subscribe((res) => (this.feed = res));
  }
}
