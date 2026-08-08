import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products } from './products';
import { ProductService } from '../../../../core/services/product';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Carts } from '../carts/carts';
import { By } from '@angular/platform-browser';
import { Table } from '../../../../shared/table/table';
import { Cart } from '../../../../core/models/cart';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;
  const mockProductsService = {
    getAll: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    mockProductsService.getAll.mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        provideRouter([]),
        provideTranslateService(),
        { provide: ProductService, useValue: mockProductsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the collection of products', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description:
          'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
        rating: {
          rate: 4.1,
          count: 259,
        },
      },
    ];
    mockProductsService.getAll.mockImplementation(() => of(mockProducts));

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();

    expect(component['items'].value()).toEqual(mockProducts);
  });

  it('should delete a product', async () => {
    mockProductsService.getAll.mockReturnValue(
      of([
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          price: 109.95,
          description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
          rating: {
            rate: 3.9,
            count: 120,
          },
        },
      ])
    );
    mockProductsService.delete.mockReturnValue(of(undefined));

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();

    const reloadSpy = vi.spyOn(component['items'], 'reload');

    const tableDebugEl = fixture.debugElement.query(By.directive(Table));
    const tableComponent = tableDebugEl.componentInstance as Table<Cart>;

    tableComponent.delete.emit(1);

    expect(mockProductsService.delete).toHaveBeenCalledWith(1);
    expect(reloadSpy).toHaveBeenCalled();
  });
});
