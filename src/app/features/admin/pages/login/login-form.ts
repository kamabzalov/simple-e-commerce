import { Component, injectAsync, signal } from '@angular/core';
import { Login } from '../../../../core/models/auth';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  imports: [FormField, FormsModule, FormRoot],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly loginModel = signal<Login>({
    username: '',
    password: '',
  });

  private readonly authService = injectAsync(() => import('../../services/auth').then(s => s.Auth));

  protected form = form(
    this.loginModel,
    schemaPath => {
      required(schemaPath.username);
      validate(schemaPath.username, ({ value }) => {
        if (!value().trim().length) {
          return {
            kind: 'emptyUsername',
            message: 'Enter username',
          };
        }
        return null;
      });
      required(schemaPath.password);
    },
    {
      submission: {
        action: async field => {
          const { username, password } = field().value();
          const authService = await this.authService();
          try {
            const result = await firstValueFrom(authService.login(username, password));
            return null;
          } catch (err) {
            if (err instanceof HttpErrorResponse) {
              return { kind: 'httpError', message: err.error };
            } else {
              return { kind: 'unknownError', message: 'Unknown error' };
            }
          }
        },
      },
    }
  );
}
