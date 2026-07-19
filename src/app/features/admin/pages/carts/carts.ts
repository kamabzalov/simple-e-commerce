import { Component, inject } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { Table } from '../../../../shared/table/table';
import { rxResource } from '@angular/core/rxjs-interop';
import { Cart } from '../../../../core/models/cart';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-carts',
  imports: [Alert, Table],
  templateUrl: './carts.html',
  styleUrl: './carts.css',
})
export class Carts {
  protected columns: (keyof Cart)[] = ['date'];

  private cartService = inject(CartService);

  items = rxResource<Cart[] | undefined, unknown>({
    stream: () => this.cartService.getAll(),
  });
}
