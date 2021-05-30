import { Component, Input, OnInit } from '@angular/core';
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
  public name: string;
  public timestamp: Date;
  public numberOfUsersFollowed: number;
  userId: number;
  @Input() profileName: string;
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  ngOnInit(): void {
    if (localStorage.getItem('username') !== undefined) {
      this.userId = Number(localStorage.getItem('id'));
      this.username = localStorage.getItem('username');
      this.name = localStorage.getItem('name');
      this.timestamp = new Date(localStorage.getItem('timestamp'));
    }
    this.getAllFollowers(this.userId);
    this.getFollowersByFollowerId(this.userId);
    console.log(this.profileName);
  }

  // Gets the total number of followers currently logged in user has.
  getAllFollowers(userId: number): void {
    this.followService.getAllFollowers(userId).subscribe((res) => {
      this.followerCount = res;
    });
  }

  getFollowersByFollowerId(userId: number): void {
    this.followService.getFollowersByFollowerId(userId).subscribe((res) => {
      this.numberOfUsersFollowed = res.length;
      console.log(res.length);
    });
  }
}
