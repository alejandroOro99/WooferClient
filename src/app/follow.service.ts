import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from './follow';

/**
 * makes all calls to the api for followers
 */
@Injectable({
  providedIn: 'root',
})
export class FollowService {
  urlFollow: string;
  urlGetFollowers: string;
  urlGetFollowersByFollowerId: string;
  constructor(private http: HttpClient) {
    this.urlFollow =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/follow/';
    this.urlGetFollowers =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/follow/countbyuser/';
    this.urlGetFollowersByFollowerId =
      'http://ec2-3-141-152-217.us-east-2.compute.amazonaws.com/follow/follower/';
  }

  getAllFollowers(userId: number): Observable<number> {
    return this.http.get<number>(this.urlGetFollowers + userId);
  }

  getFollowersByFollowerId(userId: number): Observable<Follow[]> {
    return this.http.get<Follow[]>(this.urlGetFollowersByFollowerId + userId);
  }
  unfollow(followId: number): any {
    return this.http.delete(this.urlFollow + followId);
  }
  follow(follow: Follow): Observable<Follow> {
    return this.http.post<Follow>(this.urlFollow, follow);
  }
}
