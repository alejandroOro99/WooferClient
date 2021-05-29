import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from './follow';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  urlFollow: string;
  urlGetFollowers: string;
  urlGetFollowersByFollowerId: string;
  constructor(private http: HttpClient) {
    this.urlFollow = 'http://localhost:9000/follow/';
    this.urlGetFollowers = 'http://localhost:9000/follow/countbyuser/';
    this.urlGetFollowersByFollowerId = 'http://localhost:9000/follow/follower/';
  }

  getAllFollowers(userId: number): Observable<number> {
    return this.http.get<number>(this.urlGetFollowers + userId);
  }
  getFollowersByFollowerId(userId: number): Observable<Follow[]> {
    return this.http.get<Follow[]>(this.urlGetFollowersByFollowerId + userId);
  }
  unfollow(follower: Follow) {
    this.http.delete(this.urlFollow + follower);
  }
}
