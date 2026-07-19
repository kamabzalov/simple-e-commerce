import { Component, inject } from '@angular/core';
import { Table } from '../../../../shared/table/table';
import { rxResource } from '@angular/core/rxjs-interop';
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
  protected columns: (keyof Product & string)[] = ['title', 'price', 'category'];

  private productsService = inject(ProductService);

  items = rxResource<Product[] | undefined, unknown>({
    stream: () => this.productsService.getAll(),
  });
}
