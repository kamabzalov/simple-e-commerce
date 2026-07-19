import { Component, inject, injectAsync, PLATFORM_ID, signal } from '@angular/core';
import { Login } from '../../../../core/models/auth';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  imports: [FormField, FormsModule, FormRoot, TranslatePipe],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly loginModel = signal<Login>({
    username: '',
    password: '',
  });

  private readonly authService = injectAsync(() =>
    import('../../services/auth/auth').then(s => s.Auth)
  );
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private router = inject(Router);

  protected form = form(
    this.loginModel,
    schemaPath => {
      required(schemaPath.username);
      required(schemaPath.password);
      validate(schemaPath.username, ({ value }) => {
        if (!value().trim().length) {
          return {
            kind: 'emptyUsername',
            message: 'Enter username',
          };
        }
        return null;
      });
      validate(schemaPath.password, ({ value }) => {
        if (!value().trim().length) {
          return {
            kind: 'emptyPassword',
            message: 'Enter password',
          };
        }
        return null;
      });
    },
    {
      submission: {
        action: async field => {
          const { username, password } = field().value();
          const authService = await this.authService();
          try {
            const result = await firstValueFrom(authService.login(username, password));
            if (this.isBrowser && result.token) {
              localStorage.setItem('token', result.token);
              await this.router.navigate(['/admin/dashboard']);
            }
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
