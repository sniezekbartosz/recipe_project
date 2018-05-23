import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { IfStmt } from '@angular/compiler';
import { TokenService } from '../auth/token.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = false;
  msgInvalidCredentials = 'Błędny login lub hasło';
  msg: string;

  constructor(private authService: AuthService, private token: TokenService, private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    let username = '';
    let password = '';
    this.loginForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {
          //console.log(response);
          this.error = false;
          this.token.saveToken(response.toString());
          this.router.navigate(['/moje-przepisy']);
        },
        error => {
          this.error = true;
          if (error.status === 401) {
            this.msg = 'Nieprawidłowy login lub hasło.';
          } else if (error.status === 404) {
            this.msg = 'Podane konto nie istnieje.';
          } else if (error.status === 400) {
            this.msg = 'Niepoprawny login lub hasło.';
          } else {
            this.msg = 'Unexpected error';
          }
        }
      );
    }
  }
}
