import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
    like(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{ provide: PostService, useClass: MockPostService }],
      declarations: [PostComponent],
    }).compileComponents();
    postService = TestBed.inject(PostService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
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
      fixture.debugElement.query(By.css('#like')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(postService.like).toHaveBeenCalled();
      });
    })
  );
});
