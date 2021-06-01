import { Post } from './post';
import { User } from './user';

/**
 * holds data for a comment
 */
export class Comment {
  Id: number;
  body: string;
  timestamp: Date;
  post: Post;
  user: User;

  constructor(body?: string, postId?: number, userId?: number) {
    this.body = body;
    this.post = new Post(postId);
    this.user = new User(userId);
  }

  public setUser(userId: number): void {
    this.user = new User();
    this.user.id = userId;
  }
  public setPost(postId: number): void {
    this.post = new Post(postId);
  }
}
