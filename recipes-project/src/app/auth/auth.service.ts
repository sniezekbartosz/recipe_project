import { Injectable } from '@angular/core';
import { Registration } from '../model/registration.model';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../model/login.model';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../user/user.service';

const login = 'api/auth/login';
const register = 'api/accounts';

const AUTH_TOKEN = 'AuthToken';

@Injectable()
export class AuthService {
  helper = new JwtHelperService();
  authenticated = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router, private token: TokenService, private user: UserService) { }


  signUp(model: Registration) {
    this.http.post<Registration>(register, model)
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(['/logowanie']);
        },
        error => {
          // console.log('error during register');
          // console.log(error);
        }
      );
  }

  signIn(model: LoginModel) {
    return this.http.post(login, model);
  }

  signOut() {
    this.token.removeToken();
    this.authenticated.next(false);
    this.router.navigate(['/logowanie']);
  }

  isAuthenticated(): boolean {
    var resp = !this.helper.isTokenExpired(this.token.getToken());
    this.user.setUser(localStorage['Username']);
    this.authenticated.next(resp);
    return resp;
  }

}
