import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private followService: FollowService) {}

  public followerCount: number;
  public username: string;
  userId: number;
  ngOnInit(): void {
    if (localStorage.getItem('username') !== undefined) {
      this.userId = Number(localStorage.getItem('id'));
      this.username = localStorage.getItem('username');
    }
    // this.getAllFollowers(this.userId);
  }

  getAllFollowers(userId: number): void {
    this.followService.getAllFollowers(userId).subscribe((res) => {
      this.followerCount = res;
    });
  }
}
