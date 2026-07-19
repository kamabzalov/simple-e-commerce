import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../app.config';
import { Observable } from 'rxjs';
import { Cart } from '../../../../core/models/cart';

@Service({ autoProvided: false })
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts`);
  }

  public getById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/carts/${id}`);
  }

  public update(cart: Cart): Observable<Cart> {
    const { id, ...rest } = cart;
    return this.http.put<Cart>(`${this.apiUrl}/carts/${id}`, rest);
  }

  public delete(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/carts/${id}`);
  }
}
