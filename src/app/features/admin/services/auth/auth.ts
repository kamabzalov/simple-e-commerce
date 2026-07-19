import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../app.config';

@Service()
export class Auth {
  private http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  public login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password });
  }
}
