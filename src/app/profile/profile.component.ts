import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from '../follow';
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
  public alreadyFollowed: boolean;
  followId: number;

  @Input() loggedUserId: number;
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
        console.log('user fetched from the database from profile: ' + res);
        this.user = res;
        console.log(this.user);
        this.timestamp = new Date(this.user.timestamp);
        this.getAllFollowers(false);
        this.getFollowersByFollowerId(this.user.id);
        this.getFollowersOfLoggedUser(this.loggedUserId);
        this.isLoggedUser =
          this.route.snapshot.paramMap.get('username') ===
          JSON.parse(localStorage.getItem('user')).username;
      });
  }

  // Gets the total number of followers currently logged in user has, flag is for initialization/which method calls it.
  getAllFollowers(flag: boolean): void {
    this.followService.getAllFollowers(this.user.id).subscribe((res) => {
      this.followerCount = res;
      if (flag) {
        this.getFollowersOfLoggedUser(this.loggedUserId);
      }
    });
  }

  follow(): void {
    const newFollower = new Follow(this.user.id, this.loggedUserId);
    this.followService.follow(newFollower).subscribe((res) => {
      this.getAllFollowers(true);
    });
  }
  unfollow(): void {
    this.followService.unfollow(this.followId).subscribe((res) => {
      this.getAllFollowers(true);
    });
  }
  getFollowersByFollowerId(userId: number): void {
    this.followService.getFollowersByFollowerId(userId).subscribe((res) => {
      this.numberOfUsersFollowed = res.length;
    });
  }

  setAlreadyFollowed(isFollowed: boolean): void {
    this.alreadyFollowed = isFollowed;
    console.log(this.alreadyFollowed);
  }
  getFollowersOfLoggedUser(userId: number): void {
    this.followService.getFollowersByFollowerId(userId).subscribe((res) => {
      let isFollowed = false;
      for (const follower in res) {
        if (res[follower].user.id === this.user.id) {
          isFollowed = true;
          this.followId = res[follower].id;
          console.log(this.followId);
        }
      }
      this.setAlreadyFollowed(isFollowed);
    });
  }
}
