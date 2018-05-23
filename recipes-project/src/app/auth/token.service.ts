import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../model/user.model';

const AUTH_TOKEN = 'AuthToken';
const USERNAME = 'Username';

@Injectable()
export class TokenService {

  constructor() { }

  signOut() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.clear();
  }

  saveToken(token: string) {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.setItem(AUTH_TOKEN, token);
    let helper = new JwtHelperService();
    localStorage.setItem(USERNAME, helper.decodeToken(this.getToken())['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  removeToken() {
    localStorage.clear();
  }

}
