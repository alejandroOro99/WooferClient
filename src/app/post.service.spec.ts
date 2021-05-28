import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';

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
});
