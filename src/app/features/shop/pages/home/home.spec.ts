import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { ProductService } from '../../../../core/services/product';
import { provideTranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';
import { Product } from '../../../../core/models/product';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  template: '<h1>MockProductComponent</h1>',
})
class MockProductComponent {}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockProductsFn: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockProductsFn = vi.fn().mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: mockProductsFn,
          },
        },
        provideTranslateService(),
        provideRouter([
          { path: '', component: Home },
          { path: 'products/:id', component: MockProductComponent }
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products', async () => {
    const mockProducts: Product[] = [
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
    mockProductsFn.mockReturnValue(of(mockProducts));

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    await fixture.whenStable();

    expect(component['products'].value()).toEqual(mockProducts);
  });

  it('should redirect to product details page', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        description: 'desc',
        category: 'cat',
        image: 'https://example.com/1.jpg',
        rating: { rate: 4, count: 1 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        description: 'desc',
        category: 'cat',
        image: 'https://example.com/1.jpg',
        rating: { rate: 4, count: 1 },
      },
    ];
    mockProductsFn.mockReturnValue(of(mockProducts));

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Home);
    await harness.fixture.whenStable();
    // harness.fixture.detectChanges();

    const links = harness.routeNativeElement!.querySelectorAll('a');
    expect(links.length).toEqual(2);

    const router = TestBed.inject(Router);

    links[0].click();
    await harness.fixture.whenStable();

    expect(router.url).toBe('/products/1');
    expect(harness.routeNativeElement?.textContent).toContain('MockProductComponent');
  });

  it('should show loading text during loading http data', () => {
    const products$ = new Subject<Product[]>();
    mockProductsFn.mockReturnValue(products$.asObservable());

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('HOME.LOADING');

    products$.next([]);
    products$.complete();
  });

  it('should show alert when the stream errors', async () => {
    mockProductsFn.mockReturnValue(throwError(() => new Error('fail')));

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('app-alert');
    expect(alert).toBeTruthy();
  });
});
