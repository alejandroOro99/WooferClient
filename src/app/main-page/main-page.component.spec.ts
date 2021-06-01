import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { SignupService } from '../signup.service';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  let postService: PostService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
  }

  class MockSignupService {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: PostService, useClass: MockPostService },
        { provide: SignupService, useClass: MockSignupService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
      declarations: [MainPageComponent],
    }).compileComponents();

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
