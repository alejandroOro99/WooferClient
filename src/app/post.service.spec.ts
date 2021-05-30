import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let Http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    Http = TestBed.inject(HttpTestingController);
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
    localStorage.setItem('name', 'Modern Beowulf');
    service.post('The Sachem of Slug').subscribe();

    const req = Http.expectOne('http://localhost:9000/post/');
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });

  it('should deny on no active user', () => {
    spyOn(window, 'alert');
    localStorage.setItem('name', undefined);
    service.post('The Sachem of Slug').subscribe();

    expect(window.alert).toHaveBeenCalled();
  });

  it('should like', () => {
    localStorage.setItem('id', '1');
    service.like(1).subscribe();

    const req = Http.expectOne('http://localhost:9000/like/1/1');
    expect(req.request.method).toBe('POST');
    req.flush(1);
  });
});
