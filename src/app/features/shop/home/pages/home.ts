import { Component } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, TranslatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected products: HttpResourceRef<Product[] | undefined>;

  constructor() {
    this.products = httpResource<Product[] | undefined>(() => 'https://fakestoreapi.com/products');
  }
}
