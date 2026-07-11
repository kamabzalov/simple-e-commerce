import { Component, effect, inject } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../core/models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Alert } from '../../../../shared/alert/alert';
import { Meta, Title } from '@angular/platform-browser';
import { API_URL } from '../../../../app.config';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrl: './product.css',
  imports: [CurrencyPipe, TranslatePipe, Alert],
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private translateService = inject(TranslateService);
  private titlePrefix = toSignal(this.translateService.stream('PRODUCT.BUY'));
  private readonly apiUrl = inject(API_URL);

  protected productId = toSignal(this.route.paramMap.pipe(map(params => Number(params.get('id')))));
  protected product: HttpResourceRef<Product | undefined> = httpResource<Product | undefined>(
    () => {
      const productId = this.productId();

      if (!productId) {
        return undefined;
      }
      return `${this.apiUrl}/products/${productId}`;
    }
  );

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
