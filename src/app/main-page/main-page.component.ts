import { Component, OnInit } from '@angular/core';
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
   * @param postService injected post service
   */
  constructor(private postService: PostService) {}

  /**
   * fetches the logged users name than fetches all posts
   */
  ngOnInit(): void {
    if (localStorage.getItem('username') !== undefined) {
      this.name = localStorage.getItem('name');
    }

    this.postService.getAll().subscribe((res) => (this.feed = res));
  }
}
