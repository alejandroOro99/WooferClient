export class Post {

    username: string;
    name: string;
    body: string;
    likes: number;
    comments: number;

    constructor(
        username: string,
        name: string,
        body: string,
        likes: number,
        comments: number
    ) {
        this.username = username;
        this.name = name;
        this.body = body;
        this.likes = likes;
        this.comments = comments;
    }
}