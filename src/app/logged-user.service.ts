import { Injectable } from '@angular/core';

/**
 * holds data for the logged user
 */
@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  username: string;
  name: string;
  id: number;

  constructor() {}
}
