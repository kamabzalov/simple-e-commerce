import { TestBed } from '@angular/core/testing';

import { UserService } from './user';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '../../../../app.config';
import { User, UserForm } from '../../../../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://fakestoreapi.com' },
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return collection of users', () => {
    const mockUsers: Partial<User>[] = [
      {
        address: {
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
          city: 'kilcoole',
          street: 'new road',
          number: 7682,
          zipcode: '12926-3874',
        },
        id: 1,
        email: 'john@gmail.com',
        username: 'johnd',
        name: {
          firstname: 'john',
          lastname: 'doe',
        },
        phone: '1-570-236-7033',
      },
    ];

    let result: User[] = [];

    service.getAll().subscribe(users => {
      result = users;
      expect(users.length).toEqual(1);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users`);
    req.flush(mockUsers);

    expect(result.length).toEqual(1);
  });

  it('should return user by id', () => {
    const mockUser: User = {
      address: {
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874',
      },
      id: 1,
      email: 'john@gmail.com',
      username: 'johnd',
      name: {
        firstname: 'john',
        lastname: 'doe',
      },
      phone: '1-570-236-7033',
    };

    service.getById(1).subscribe(user => {
      expect(mockUser.id).toEqual(user?.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/1`);

    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should delete users by id', () => {
    const mockUser: User = {
      address: {
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874',
      },
      id: 1,
      email: 'john@gmail.com',
      username: 'johnd',
      name: {
        firstname: 'john',
        lastname: 'doe',
      },
      phone: '1-570-236-7033',
    };

    service.delete(1).subscribe(user => {
      expect(mockUser.id).toEqual(user.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/1`);

    expect(req.request.method).toEqual('DELETE');
    req.flush(mockUser);
  });

  it('should update user by id', () => {
    const mockUser: UserForm = {
      id: 1,
      email: 'example@email.com',
      username: 'username',
      phone: '112233',
      name: {
        firstname: 'John',
        lastname: 'Doe',
      },
    };

    service.update(mockUser).subscribe(user => {
      expect(user.id).toEqual(mockUser.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/1`);

    expect(req.request.method).toEqual('PUT');
    req.flush(mockUser);
  });

  it('should eras 400 code error for incorrect user id', () => {
    let error: unknown;

    service.getById(-1).subscribe({
      error: err => (error = err),
    });

    httpMock
      .expectOne(`${service['apiUrl']}/users/-1`)
      .flush('Server error', { status: 400, statusText: 'Bad Request' });

    expect((error as HttpErrorResponse).status).toEqual(400);
  });
});
