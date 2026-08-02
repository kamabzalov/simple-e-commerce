import { TestBed } from '@angular/core/testing';

import { CartService } from './cart';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '../../../../app.config';
import { Cart } from '../../../../core/models/cart';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://fakestoreapi.com' },
      ],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return collection of carts', () => {
    const mockCarts: Partial<Cart>[] = [
      {
        id: 1,
        userId: 1,
        date: '2020-03-02T00:00:00.000Z',
        products: [
          {
            productId: 1,
            quantity: 4,
          },
          {
            productId: 2,
            quantity: 1,
          },
          {
            productId: 3,
            quantity: 6,
          },
        ],
      },
      {
        id: 2,
        userId: 1,
        date: '2020-01-02T00:00:00.000Z',
        products: [
          {
            productId: 2,
            quantity: 4,
          },
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 5,
            quantity: 2,
          },
        ],
      },
    ];

    let result: Cart[] = [];

    service.getAll().subscribe(products => (result = products));

    const req = httpMock.expectOne(`${service['apiUrl']}/carts`);
    req.flush(mockCarts);

    expect(result.length).toEqual(2);
  });

  it('should delete cart by id', () => {
    const mockCart: Cart = {
      id: 1,
      userId: 1,
      date: '2020-03-02T00:00:00.000Z',
      products: [
        {
          productId: 1,
          quantity: 4,
        },
        {
          productId: 2,
          quantity: 1,
        },
        {
          productId: 3,
          quantity: 6,
        },
      ],
    };

    service.delete(1).subscribe(cart => {
      expect(cart.id).toEqual(mockCart.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/carts/1`);

    expect(req.request.method).toEqual('DELETE');
    req.flush(mockCart);
  });
});
