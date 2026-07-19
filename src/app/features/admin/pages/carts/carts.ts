import { Component, DestroyRef, inject } from '@angular/core';
import { Alert } from '../../../../shared/alert/alert';
import { Table } from '../../../../shared/table/table';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cart } from '../../../../core/models/cart';
import { CartService } from '../../services/cart/cart';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-carts',
  imports: [Alert, Table, TranslatePipe],
  templateUrl: './carts.html',
  providers: [CartService],
})
export class Carts {
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  protected columns: (keyof Cart & string)[] = ['date'];

  protected items = rxResource<Cart[] | undefined, unknown>({
    stream: () => this.cartService.getAll(),
  });

  protected deleteCart($event: number) {
    this.cartService
      .delete($event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.items.reload(),
      });
  }
}
