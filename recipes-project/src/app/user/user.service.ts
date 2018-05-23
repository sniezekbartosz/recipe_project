import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Subject } from 'rxjs';
import { TokenService } from '../auth/token.service';

@Injectable()
export class UserService {
  user = new Subject<string>();
  private username: string;
  constructor(private token: TokenService) { }

  getUsername() {
    return this.username;
  }

  setUser(username: string) {
    this.username = username;
    this.user.next(username);
  }


}
