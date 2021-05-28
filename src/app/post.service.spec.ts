import { TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { LoggedUserService } from './logged-user.service';

describe('PostService', () => {
  let service: PostService;
  let Http: HttpTestingController;

  let loggedUser: LoggedUserService;

  class MockLoggedUserService {
    username: string;
    name: string;
    id: number;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoggedUserService, useClass: MockLoggedUserService },
      ],
    });
    service = TestBed.inject(PostService);
    Http = TestBed.inject(HttpTestingController);
    loggedUser = TestBed.inject(LoggedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ask for a list', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = Http.expectOne('http://localhost:9000/posts/');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should post', () => {
    loggedUser.name = 'Modern Beowulf';
    service.post('The Sachem of Slug').subscribe();

    const req = Http.expectOne('http://localhost:9000/post/');
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });

  it('should deny on no active user', () => {
    spyOn(window, 'alert');
    loggedUser.name = null;
    service.post('The Sachem of Slug').subscribe();

    expect(window.alert).toHaveBeenCalled();
  });

  it('should like', () => {
    loggedUser.id = 1;
    service.like(1).subscribe();

    const req = Http.expectOne('http://localhost:9000/like/1/1');
    expect(req.request.method).toBe('POST');
    req.flush(1);
  });
});
