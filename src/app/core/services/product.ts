import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.config';
import { Product } from '../models/product';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}
