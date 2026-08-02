import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails } from './product';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product';
import { Meta, Title } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  const mockProduct: Product = {
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
  };

  const mockProductService = {
    getById: vi.fn().mockImplementation(() => of()),
  };

  const titleService = {
    setTitle: vi.fn(),
  };

  const metaService = {
    updateTag: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideTranslateService(),
        provideRouter([{ path: 'product/:id', component: ProductDetails }]),
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        {
          provide: Title,
          useValue: titleService,
        },
        {
          provide: Meta,
          useValue: metaService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product by id from the url param', async () => {
    mockProductService.getById.mockImplementation(() => of(mockProduct));

    const harness = await RouterTestingHarness.create();
    const routeComponent = await harness.navigateByUrl(`/product/${mockProduct.id}`, ProductDetails);
    await harness.fixture.whenStable();

    expect(routeComponent['product'].value()?.id).toEqual(mockProduct.id);
    expect(titleService.setTitle).toHaveBeenCalledWith(`PRODUCT.BUY ${mockProduct.title}`);
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: mockProduct.description,
    });
  });
});
