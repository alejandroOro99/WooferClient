import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';

/**
 * takes a list of post objects to display
 */
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  /**
   * A list of posts to display
   */
  @Input() posts: Post[];

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit(): void {}
}
