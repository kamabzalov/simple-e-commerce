import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { UserService } from '../../services/user/user';
import { form, FormField, required } from '@angular/forms/signals';
import { UserForm } from '../../../../core/models/user';

@Component({
  selector: 'app-user',
  imports: [Alert, TranslatePipe, FormField],
  templateUrl: './user.html',
  providers: [UserService],
})
export class UserDetails {
  private usersService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  protected userId = toSignal(this.route.paramMap.pipe(map(params => Number(params.get('id')))));
  protected isNew = signal<boolean>(false);
  private alertMessage = toSignal(this.translateService.stream('ADMIN_USER_PAGE.ALERT_MESSAGE'));

  protected user = rxResource({
    params: () => this.userId(),
    stream: () => {
      const userId = this.userId();
      if (!userId || isNaN(userId)) {
        return of(null);
      }
      return this.usersService.getById(userId);
    },
  });

  protected userFormModel = signal<UserForm>({
    id: 0,
    email: '',
    phone: '',
    username: '',
    name: { firstname: '', lastname: '' },
  });

  protected userForm = form(this.userFormModel, schemaPath => {
    required(schemaPath.name.firstname);
    required(schemaPath.name.lastname);
    required(schemaPath.email);
    required(schemaPath.username);
  });

  constructor() {
    this.isNew.set(this.route.snapshot.data['isNew']);
    effect(() => {
      const user = this.user.value();
      if (user) {
        this.userFormModel.set({
          id: user.id,
          email: user.email,
          phone: user.phone,
          username: user.username,
          name: user.name,
        });
      }
    });
  }

  protected saveUser($event: Event) {
    $event.preventDefault();
    const formData = this.userFormModel();
    if (formData.id) {
      this.usersService
        .update(formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: user => {
            if (Object.keys(user).length) {
              alert(this.alertMessage());
              this.router.navigate(['admin', 'dashboard', 'users']);
            }
          },
        });
    } else {
      this.usersService
        .add(formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: user => {
            if (Object.keys(user).length) {
              alert(this.alertMessage());
              this.router.navigate(['admin', 'dashboard', 'users']);
            }
          },
        });
    }
  }
}
