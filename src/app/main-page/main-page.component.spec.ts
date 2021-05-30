import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  let postService: PostService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{ provide: PostService, useClass: MockPostService }],
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
