import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../app.config';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user';

@Service({ autoProvided: false })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  public update(user: User): Observable<User> {
    const { id, ...rest } = user;
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, rest);
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}
