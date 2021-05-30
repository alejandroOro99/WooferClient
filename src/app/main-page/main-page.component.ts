import { LocationStrategy } from '@angular/common';
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
  public username: string;
  public name: string;
  public profileName: string;
  /**
   * list of posts that will be displayed
   */
  feed: Post[] = [];
  searchUser: boolean;
  /**
   *
   * @param postService injected post service
   */
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {}

  preventBackButton(): void {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
  /**
   * fetches the logged users name than fetches all posts
   */
  ngOnInit(): void {
    if (localStorage.getItem('username') !== undefined) {
      this.name = localStorage.getItem('name');
    }
    this.route.params.subscribe((p) => {
      this.username = p.username;
    });

    this.postService
      .getByUsername(this.username)
      .subscribe((res) => (this.feed = res));
    this.preventBackButton();
    this.searchUser = false;
  }
}
