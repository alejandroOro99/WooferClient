import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommentService } from '../comment.service';
import { LoginService } from '../login.service';
import { Post } from '../post';
import { PostService } from '../post.service';

import { CommentPageComponent } from './comment-page.component';

describe('CommentPageComponent', () => {
  let component: CommentPageComponent;
  let fixture: ComponentFixture<CommentPageComponent>;
  let postService: PostService;

  class MockLoginService {}
  class MockPostService {
    getById(): any {}
  }
  class MockCommentService {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: PostService, useClass: MockPostService },
        { provide: CommentService, useClass: MockCommentService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 1 }) },
          },
        },
      ],
      declarations: [CommentPageComponent],
    }).compileComponents();
    postService = TestBed.inject(PostService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPageComponent);
    component = fixture.componentInstance;
    spyOn(postService, 'getById').and.returnValue(
      new Observable<Post>((o) => o.next(new Post()))
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
