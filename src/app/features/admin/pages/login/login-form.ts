import { Component, signal } from '@angular/core';
import { Login } from '../../../../core/models/auth';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly loginModel = signal<Login>({
    username: '',
    password: '',
  });

  protected form = form(this.loginModel);
}
