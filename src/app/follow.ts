import { User } from './user';

/**
 * object that holds follower data
 */

export class Follow {
  id: number;
  follower: User;
  user: User;

  constructor(userId: number, followerId: number) {
    this.user = new User(userId);
    this.follower = new User(followerId);
  }
}
