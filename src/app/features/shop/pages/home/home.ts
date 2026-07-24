import { Component, inject, ResourceRef } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Alert } from '../../../../shared/alert/alert';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../../core/services/product';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, TranslatePipe, RouterLink, Alert, NgOptimizedImage],
  templateUrl: './home.html',
})
export class Home {
  private productsService = inject(ProductService);

  protected products: ResourceRef<Product[] | undefined> = rxResource<
    Product[] | undefined,
    unknown
  >({
    stream: () => this.productsService.getAll(),
  });
}
