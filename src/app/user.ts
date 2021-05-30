/**
 * holds user data
 */
export class User {
  constructor(id?: number) {
    this.id = id;
  }
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  timestamp: Date;
}
