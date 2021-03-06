import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone(
        {
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())
        }
      );
    }
    return next.handle(authReq).do(
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/logowanie']);
          }
        }

      }
    );
  }
}

