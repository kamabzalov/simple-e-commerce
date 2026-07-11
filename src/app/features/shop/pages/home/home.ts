import { Component, inject } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Alert } from '../../../../shared/alert/alert';
import { API_URL } from '../../../../app.config';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, TranslatePipe, RouterLink, Alert],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected products: HttpResourceRef<Product[] | undefined>;
  private apiUrl = inject(API_URL);

  constructor() {
    this.products = httpResource<Product[] | undefined>(() => `${this.apiUrl}/products`);
  }
}
