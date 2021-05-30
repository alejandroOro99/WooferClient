import { User } from './user';

/**
 * object that holds follower data
 */
export class Follow {
  id: number;
  follower: User;
  user: User;
}
