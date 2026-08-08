import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Users } from './users';
import { provideTranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Products } from '../products/products';
import { By } from '@angular/platform-browser';
import { Table } from '../../../../shared/table/table';
import { Cart } from '../../../../core/models/cart';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  const mockUsersService = {
    getAll: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    mockUsersService.getAll.mockReturnValue(Promise.resolve([]));
    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [provideTranslateService(), provideRouter([])],
    })
      .overrideComponent(Users, {
        set: {
          providers: [{ provide: UserService, useValue: mockUsersService }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the collection of users', async () => {
    const mockUsers = [
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
        password: 'm38rmF$',
        name: {
          firstname: 'john',
          lastname: 'doe',
        },
        phone: '1-570-236-7033',
        __v: 0,
      },
    ];

    mockUsersService.getAll.mockReturnValue(of(mockUsers));

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    await fixture.whenStable();

    expect(component['items'].value()?.length).toEqual(mockUsers.length);
  });

  it('should delete a user', async () => {
    mockUsersService.getAll.mockReturnValue(
      of([
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
          password: 'm38rmF$',
          name: {
            firstname: 'john',
            lastname: 'doe',
          },
          phone: '1-570-236-7033',
          __v: 0,
        },
      ])
    );
    mockUsersService.delete.mockReturnValue(of(undefined));

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    await fixture.whenStable();

    const reloadSpy = vi.spyOn(component['items'], 'reload');

    const tableDebugEl = fixture.debugElement.query(By.directive(Table));
    const tableComponent = tableDebugEl.componentInstance as Table<Cart>;

    tableComponent.delete.emit(1);

    expect(mockUsersService.delete).toHaveBeenCalledWith(1);
    expect(reloadSpy).toHaveBeenCalled();
  });
});
