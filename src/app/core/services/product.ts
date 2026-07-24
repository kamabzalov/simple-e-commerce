import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.config';
import { Product } from '../models/product';
import { ProductForm } from '../../features/admin/pages/product/product';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  public getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  public add(product: Omit<ProductForm, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  public update(product: ProductForm): Observable<Product> {
    const { id, ...rest } = product;
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, rest);
  }

  public delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }
}
