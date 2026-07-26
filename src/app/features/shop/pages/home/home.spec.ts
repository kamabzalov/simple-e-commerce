import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { ProductService } from '../../../../core/services/product';
import { provideTranslateService } from '@ngx-translate/core';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () => Promise.resolve([]),
          },
        },
        provideTranslateService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
