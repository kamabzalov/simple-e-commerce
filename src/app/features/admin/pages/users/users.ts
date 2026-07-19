import { Component, inject } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { Table } from '../../../../shared/table/table';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user/user';
import { User } from '../../../../core/models/user';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  imports: [Alert, Table, TranslatePipe],
  templateUrl: './users.html',
})
export class Users {
  protected columns: (keyof User & string)[] = ['fullName', 'email', 'phone'];

  private usersService = inject(UserService);

  items = rxResource<User[] | undefined, unknown>({
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
}
