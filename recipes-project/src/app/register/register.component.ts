import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    let username = '';
    let email = '';
    let password = '';
    this.registerForm = new FormGroup({
      'username': new FormControl(username, [Validators.minLength(6), Validators.maxLength(30), Validators.required]),
      'email': new FormControl(email, [Validators.email, Validators.required]),
      'password': new FormControl(password, [Validators.minLength(6), Validators.required])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value);
    }
  }



}
