import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carts } from './carts';
import { provideTranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart/cart';

describe('Carts', () => {
  let component: Carts;
  let fixture: ComponentFixture<Carts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carts],
      providers: [provideTranslateService()],
    })
      .overrideComponent(Carts, {
        set: {
          providers: [
            {
              provide: CartService,
              useValue: {
                getAll: () => Promise.resolve([]),
                delete: () => Promise.resolve(),
              },
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Carts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
