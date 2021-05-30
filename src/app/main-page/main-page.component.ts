import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  username: string;

  /**
   * list of posts that will be displayed
   */
  feed: Post[] = [];

  /**
   *
   * @param postService injected post service
   */
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  /**
   * fetches the logged users name than fetches all posts
   */
  ngOnInit(): void {
    if (localStorage.getItem('username') !== undefined) {
      this.name = localStorage.getItem('name');
    }
    this.route.params.subscribe((p) => {
      this.username = p['username'];
    });

    this.postService
      .getByUsername(this.username)
      .subscribe((res) => (this.feed = res));
  }
}
