import { Component, inject } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { Table } from '../../../../shared/table/table';
import { rxResource } from '@angular/core/rxjs-interop';
import { Cart } from '../../../../core/models/cart';
import { CartService } from '../../services/cart/cart';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-carts',
  imports: [Alert, Table, TranslatePipe],
  templateUrl: './carts.html',
})
export class Carts {
  protected columns: (keyof Cart & string)[] = ['date'];

  private cartService = inject(CartService);

  items = rxResource<Cart[] | undefined, unknown>({
    stream: () => this.cartService.getAll(),
  });
}
