import { Component, ChangeDetectorRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipeService } from './shared/recipe.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { TokenService } from './auth/token.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserModel } from './model/user.model';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  authSubscription: Subscription;
  mobileQuery: MediaQueryList;
  mode = new FormControl('side');
  title = 'app';
  logged;
  username = '';
  sub: Subscription;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService, private user: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.authSubscription = this.auth.authenticated.subscribe(
      resp => {
        this.logged = resp;
      }
    );
    this.logged = this.auth.isAuthenticated();
    this.sub = this.user.user.subscribe(
      response => this.username = response
    );
    this.username = this.user.getUsername();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.sub.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
