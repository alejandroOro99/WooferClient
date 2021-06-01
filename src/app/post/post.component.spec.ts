import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Comment } from '../comment';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  let commentService: CommentService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
    like(): any {}
    refreshLikes(): any {}
  }

  class MockCommentService {
    getCommentsByPost(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: PostService, useClass: MockPostService },
        { provide: CommentService, useClass: MockCommentService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 1 }) },
          },
        },
      ],
      declarations: [PostComponent],
    }).compileComponents();
    postService = TestBed.inject(PostService);
    commentService = TestBed.inject(CommentService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    spyOn(commentService, 'getCommentsByPost').and.returnValue(
      new Observable<Comment[]>((o) => o.next([]))
    );
    component.post = new Post();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should like a post',
    waitForAsync(() => {
      spyOn(postService, 'like').and.returnValue(
        new Observable<number>((o) => {
          o.next(1);
        })
      );
      spyOn(postService, 'refreshLikes').and.returnValue(
        new Observable((o) => o.next())
      );
      fixture.debugElement.query(By.css('.fa-heart')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(postService.like).toHaveBeenCalled();
      });
    })
  );
});
