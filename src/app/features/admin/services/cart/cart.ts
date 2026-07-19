import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../app.config';
import { Observable } from 'rxjs';
import { Cart } from '../../../../core/models/cart';

@Service()
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts`);
  }
}
