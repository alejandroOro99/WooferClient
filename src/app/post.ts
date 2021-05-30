/**
 * holds data for a post
 */
export class Post {
  constructor(id?: number) {
    this.id = id;
  }
  username: string;
  name: string;
  body: string;
  likes: number;
  comments: number;
  userId: number;
  id: number;
}
