import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails } from './product';
import { ProductService } from '../../../../core/services/product';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

describe('Product', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        { provide: ProductService, useValue: { getById: () => Promise.resolve({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
