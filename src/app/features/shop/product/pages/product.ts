import { Component, inject } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../core/models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Alert } from '../../../../shared/alert/alert';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrl: './product.css',
  imports: [CurrencyPipe, TranslatePipe, Alert],
})
export class ProductDetails {
  private route = inject(ActivatedRoute);

  protected productId = toSignal(this.route.paramMap.pipe(map(params => Number(params.get('id')))));
  protected product: HttpResourceRef<Product | undefined> = httpResource<Product | undefined>(
    () => {
      const productId = this.productId();

      if (!productId) {
        return undefined;
      }
      return `https://fakestoreapi.com/products/${productId}`;
    }
  );
}
