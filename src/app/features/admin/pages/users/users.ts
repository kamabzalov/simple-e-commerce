import { Component, DestroyRef, inject } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { Table } from '../../../../shared/table/table';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user/user';
import { User } from '../../../../core/models/user';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  imports: [Alert, Table, TranslatePipe],
  templateUrl: './users.html',
  providers: [UserService],
})
export class Users {
  private usersService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  protected columns: (keyof User & string)[] = ['fullName', 'email', 'phone'];

  protected items = rxResource<User[] | undefined, unknown>({
    stream: () =>
      this.usersService.getAll().pipe(
        map(users =>
          users.map(user => ({
            ...user,
            fullName: `${user.name.firstname} ${user.name.lastname}`,
          }))
        )
      ),
  });

  protected deleteUser($event: number) {
    this.usersService
      .delete($event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.items.reload(),
      });
  }
}
