import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  authenticated;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSub = this.auth.authenticated.subscribe(
      resp => this.authenticated = resp
    );
    this.authenticated = this.auth.isAuthenticated();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  logout() {
    this.auth.signOut();
  }


}
