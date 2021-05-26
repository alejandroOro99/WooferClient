import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedUserService } from '../logged-user.service';
import { PostService } from '../post.service';

import { PosterComponent } from './poster.component';

describe('PosterComponent', () => {
  let component: PosterComponent;
  let fixture: ComponentFixture<PosterComponent>;

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
      providers: [
        { provide: PostService, useClass: MockPostService },
        { provide: LoggedUserService, useClass: MockLoggedUserService },
      ],
      declarations: [PosterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
