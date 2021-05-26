import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { LoggedUserService } from '../logged-user.service';
import { Post } from '../post';
import { PostService } from '../post.service';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  let loggedUserService: LoggedUserService;
  let postService: PostService;

  class mockPostService {
    getAll() {}
    post() {}
  }

  class mockLoggedUserService {
    username: string;
    name: string;
    id: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: PostService, useClass: mockPostService },
        { provide: LoggedUserService, useClass: mockLoggedUserService },
      ],
      declarations: [MainPageComponent],
    }).compileComponents();

    loggedUserService = TestBed.inject(LoggedUserService);
    postService = TestBed.inject(PostService);
  });

  beforeEach(() => {
    spyOn(postService, 'getAll').and.returnValue(new Observable<Post[]>());
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
