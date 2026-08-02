import { TestBed } from '@angular/core/testing';

import { ProductService } from './product';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product, ProductForm } from '../models/product';
import { API_URL } from '../../app.config';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://fakestoreapi.com' },
      ],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return collection of products', () => {
    const mockProducts: Partial<Product>[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10.99,
        description: 'Description of Product 1',
        category: 'Category 1',
        image: 'https://example.com/product1.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20.99,
        description: 'Description of Product 2',
        category: 'Category 1',
        image: 'https://example.com/product1.jpg',
      },
    ];

    let result: Product[] = [];

    service.getAll().subscribe(products => (result = products));

    const req = httpMock.expectOne(`${service['apiUrl']}/products`);
    req.flush(mockProducts);

    expect(result.length).toEqual(2);
  });

  it('should return product by id', () => {
    const mockProduct: Partial<Product> = {
      id: 1,
      title: 'Product 1',
      price: 10.99,
      description: 'Description of Product 1',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    };

    service.getById(1).subscribe(product => {
      expect(mockProduct.id).toEqual(product?.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/products/1`);

    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });

  it('should delete product by id', () => {
    const mockProduct: Partial<Product> = {
      id: 1,
      title: 'Product 1',
      price: 10.99,
      description: 'Description of Product 1',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    };

    service.delete(1).subscribe(product => {
      expect(mockProduct.id).toEqual(product?.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/products/1`);

    expect(req.request.method).toEqual('DELETE');
    req.flush(mockProduct);
  });

  it('should update product by id', () =>  {
    const mockProduct: ProductForm = {
      id: 1,
      title: 'Product title',
      description: 'Product description',
      price: 100,
    };

    service.update(mockProduct).subscribe(product => {
      expect(product.id).toEqual(mockProduct.id);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/products/1`);

    expect(req.request.method).toEqual('PUT');
    req.flush(mockProduct);
  });

  it('should eras 400 code error for incorrect product id', () => {
    let error: unknown;

    service.getById(-1).subscribe({
      error: err => (error = err),
    });

    httpMock
      .expectOne(`${service['apiUrl']}/products/-1`)
      .flush('Server error', { status: 400, statusText: 'Bad Request' });

    expect((error as HttpErrorResponse).status).toEqual(400);
  });
});
