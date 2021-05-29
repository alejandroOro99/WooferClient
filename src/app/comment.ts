import { Post } from './post';
import { User } from './user';

export class Comment {
  constructor(body: string, postId: number, userId: number) {
    this.body = body;
    this.post = new Post(postId);
    this.user = new User(userId);
  }

  public setUser(userId: number) {
    this.user = new User(userId);
  }
  public setPost(postId: number) {
    this.post = new Post(postId);
  }

  Id: number;
  body: string;
  timestamp: Date;
  post: Post;
  user: User;
}
