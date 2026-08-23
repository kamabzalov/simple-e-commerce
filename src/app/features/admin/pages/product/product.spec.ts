import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails } from './product';
import { ProductService } from '../../../../core/services/product';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Product', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;
  let mockProductService: Partial<ProductService>;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  const productFormData = {
    id: 1,
    description: 'Product description',
    price: 100,
    title: 'Product Title',
  };

  const submitProductForm = () => {
    const fakeEvent = { preventDefault: vi.fn() } as unknown as Event;

    component['saveProduct'](fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  };

  beforeEach(async () => {
    mockProductService = {
      getById: vi.fn(),
      update: vi.fn(),
      add: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideTranslateService(),
        provideRouter([
          {
            path: 'products/:id',
            component: ProductDetails,
          },
        ]),
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;

    const router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new product', () => {
    component['productFormModel'].set({
      ...productFormData,
      id: 0,
    });

    mockProductService.add = vi.fn().mockReturnValue(
      of({
        ...productFormData,
        id: 2,
      })
    );

    submitProductForm();

    expect(mockProductService.add).toHaveBeenCalled();
    expect(mockProductService.update).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['admin', 'dashboard']);
  });

  it('should update existing product', () => {
    component['productFormModel'].set(productFormData);

    mockProductService.update = vi.fn().mockReturnValue(of(productFormData));

    submitProductForm();

    expect(mockProductService.update).toHaveBeenCalled();
    expect(mockProductService.add).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['admin', 'dashboard']);
  });

  it('should get product data by id and fill form model', async () => {
    const product = {
      id: 1,
      title: 'Product Title',
      description: 'Product Description',
      price: 100,
    };

    mockProductService.getById = vi.fn().mockReturnValue(of(product));
    const harness = await RouterTestingHarness.create();

    const component = await harness.navigateByUrl(`/products/1`, ProductDetails);

    expect(mockProductService.getById).toHaveBeenCalledWith(1);
    expect(component['productFormModel']()).toEqual({
      id: 1,
      title: 'Product Title',
      description: 'Product Description',
      price: 100,
    });
  });
});
