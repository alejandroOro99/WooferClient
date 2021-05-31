import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-woof',
  templateUrl: './woof.component.html',
  styleUrls: ['./woof.component.css'],
})
export class WoofComponent implements OnInit {
  @Output() postMade = new EventEmitter<Post>();
  /**
   * body of the post
   */
  body: string;

  /**
   * @param thingThatPosts injected post service
   */
  constructor(private thingThatPosts: PostService) {}

  /**
   * determins weither a user exists
   */
  ngOnInit(): void {}

  /**
   * posts the post
   */
  submit(): void {
    if (this.body) {
      this.thingThatPosts.post(this.body).subscribe((p) => {
        this.body = '';
        this.postMade.emit();
      });
    }
  }
}
