import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedUserService } from '../logged-user.service';
import { PostService } from '../post.service';

import { PosterComponent } from './poster.component';

class mockPostService {
  getAll() {}
  post() {}
}

class mockLoggedUserService {
  username: string;
  name: string;
  id: number;
}

describe('PosterComponent', () => {
  let component: PosterComponent;
  let fixture: ComponentFixture<PosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: PostService, useClass: mockPostService },
        { provide: LoggedUserService, useClass: mockLoggedUserService },
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
