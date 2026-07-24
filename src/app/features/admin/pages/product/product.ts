import { Component, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { ProductForm } from '../../../../core/models/product';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Alert } from '../../../../shared/alert/alert';

@Component({
  selector: 'app-product',
  imports: [TranslatePipe, Alert, FormField],
  templateUrl: './product.html',
})
export class ProductDetails {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translateService = inject(TranslateService);

  protected productId = toSignal(this.route.paramMap.pipe(map(params => Number(params.get('id')))));
  protected isNew = signal<boolean>(false);
  private alertMessage = toSignal(this.translateService.stream('ADMIN_PRODUCT_PAGE.ALERT_MESSAGE'));

  protected product = rxResource({
    stream: () => {
      const productId = this.productId();
      if (!productId || isNaN(productId)) {
        return of(null);
      }
      return this.productService.getById(productId);
    },
  });

  protected productFormModel = signal<ProductForm>({
    id: 0,
    title: '',
    price: 0,
    description: '',
  });

  protected productForm = form(this.productFormModel);

  constructor() {
    this.isNew.set(this.route.snapshot.data['isNew']);
    effect(() => {
      const product = this.product.value();
      if (product) {
        this.productFormModel.set({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
        });
      }
    });
  }

  protected saveProduct($event: Event) {
    $event.preventDefault();
    const formData = this.productFormModel();
    if (formData.id) {
      this.productService.update(formData).subscribe({
        next: product => {
          if (product.id) {
            alert(this.alertMessage());
            this.router.navigate(['admin', 'dashboard']);
          }
        },
      });
    } else {
      this.productService.add(formData).subscribe({
        next: product => {
          if (product.id) {
            alert(this.alertMessage());
            this.router.navigate(['admin', 'dashboard']);
          }
        },
      });
    }
  }
}
