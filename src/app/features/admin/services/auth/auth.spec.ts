import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '../../../../app.config';
import { HttpErrorResponse } from '@angular/common/http';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth,
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://fakestoreapi.com' },
      ],
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token after successful login', () => {
    const mockTokenResponse = { token: 'fake-token' };

    let result = { token: '' };

    service.login('username', 'password').subscribe(token => (result = token));

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toEqual('POST');

    req.flush({ token: 'fake-token' });

    expect(result).toEqual(mockTokenResponse);
  });

  it('should erase an error when trying login with incorrect credentials', () => {
    let error: unknown;

    service.login('invalid-login', 'invalid-password').subscribe({
      error: err => (error = err),
    });

    httpMock
      .expectOne(`${service['apiUrl']}/auth/login`)
      .flush('Invalid login or password', { status: 401, statusText: 'Unauthorized' });

    expect((error as HttpErrorResponse).status).toEqual(401);
  });
});
