import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails } from './product';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { ProductService } from '../../../../core/services/product';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        {
          provide: ProductService,
          useValue: {
            getById: () => Promise.resolve({}),
          },
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
});
