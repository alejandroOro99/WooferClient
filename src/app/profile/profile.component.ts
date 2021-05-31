import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../follow.service';
import { SignupService } from '../signup.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private followService: FollowService,
    private route: ActivatedRoute,
    private signupService: SignupService
  ) {}

  public followerCount: number;
  // public username: string;
  // public name: string;
  public timestamp: Date;
  public numberOfUsersFollowed: number;
  userId: number;
  isLoggedUser: boolean;
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
    this.signupService
      .getUserByUsername(this.route.snapshot.paramMap.get('username'))
      .subscribe((res) => {
        this.user = res;
        this.timestamp = new Date(this.user.timestamp);
        this.getAllFollowers(this.user.id);
        this.getFollowersByFollowerId(this.user.id);
        this.isLoggedUser =
          this.route.snapshot.paramMap.get('username') ===
          JSON.parse(localStorage.getItem('user')).username;
      });
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
    });
  }
}
