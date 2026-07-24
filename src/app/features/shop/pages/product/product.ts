import { Component, effect, inject, ResourceRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../core/models/product';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Alert } from '../../../../shared/alert/alert';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../../../../core/services/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  imports: [CurrencyPipe, TranslatePipe, Alert],
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private translateService = inject(TranslateService);
  private titlePrefix = toSignal(this.translateService.stream('PRODUCT.BUY'));
  private productService = inject(ProductService);

  protected productId = toSignal(this.route.paramMap.pipe(map(params => Number(params.get('id')))));
  protected product: ResourceRef<Product | undefined> = rxResource<Product | undefined, unknown>({
    stream: () => {
      const productId = this.productId();
      if (!productId) {
        return of(undefined);
      }
      return this.productService.getById(productId);
    },
  });

  constructor() {
    effect(() => {
      const product = this.product.value();

      if (!product) {
        return;
      }

      this.meta.updateTag({ name: 'description', content: product.description });
      this.title.setTitle(`${this.titlePrefix()} ${product.title}`);
    });
  }
}
