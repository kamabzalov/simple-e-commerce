import { Component, DestroyRef, inject } from '@angular/core';
import { Table } from '../../../../shared/table/table';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product';
import { Alert } from '../../../../shared/alert/alert';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [Table, Alert, TranslatePipe],
  templateUrl: './products.html',
})
export class Products {
  private productsService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  protected columns: (keyof Product & string)[] = ['title', 'price', 'category'];

  protected items = rxResource<Product[] | undefined, unknown>({
    stream: () => this.productsService.getAll(),
  });

  protected deleteProduct($event: number) {
    this.productsService
      .delete($event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.items.reload(),
      });
  }
}
