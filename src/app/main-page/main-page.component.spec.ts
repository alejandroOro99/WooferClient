import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { LoggedUserService } from '../logged-user.service';
import { Post } from '../post';
import { PostService } from '../post.service';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  let loggedUserService: LoggedUserService;
  let postService: PostService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
  }

  class MockLoggedUserService {
    username: string;
    name: string;
    id: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: PostService, useClass: MockPostService },
        { provide: LoggedUserService, useClass: MockLoggedUserService },
      ],
      declarations: [MainPageComponent],
    }).compileComponents();

    loggedUserService = TestBed.inject(LoggedUserService);
    postService = TestBed.inject(PostService);
  });

  beforeEach(() => {
    spyOn(postService, 'getAll').and.returnValue(
      new Observable<Post[]>((o) => o.next([]))
    );
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
