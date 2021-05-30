import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';
import { LoggedUserService } from '../logged-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private followService: FollowService,
    private loggedUser: LoggedUserService
  ) {}

  public followerCount: number;
  public username: string;
  userId: number;
  ngOnInit(): void {
    if (this.loggedUser !== undefined) {
      this.userId = this.loggedUser.id;
      this.username = this.loggedUser.username;
    }
    // this.getAllFollowers(this.userId);
  }

  getAllFollowers(userId: number): void {
    this.followService.getAllFollowers(userId).subscribe((res) => {
      this.followerCount = res;
    });
  }
}
