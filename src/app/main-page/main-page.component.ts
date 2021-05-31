import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';

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
  // public name: string;
  // public profileName: string;
  /**
   * list of posts that will be displayed
   */
  posts$: Observable<Post[]>;
  user: User;
  searchUser: boolean;
  isLoggedUser: boolean;
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
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.isLoggedUser =
      this.route.snapshot.paramMap.get('username') ===
      JSON.parse(localStorage.getItem('user')).username;
    this.getPosts();
  }

  getPosts(): void {
    this.posts$ = this.postService.getByUsername(
      this.route.snapshot.paramMap.get('username')
    );
  }
}
