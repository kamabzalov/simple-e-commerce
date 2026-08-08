import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carts } from './carts';
import { provideTranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart/cart';
import { of } from 'rxjs';
import { Cart } from '../../../../core/models/cart';
import { By } from '@angular/platform-browser';
import { Table } from '../../../../shared/table/table';

describe('Carts', () => {
  let component: Carts;
  let fixture: ComponentFixture<Carts>;
  const mockCartService = {
    getAll: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    mockCartService.getAll.mockImplementation(() => of([]));
    await TestBed.configureTestingModule({
      imports: [Carts],
      providers: [provideTranslateService()],
    })
      .overrideComponent(Carts, {
        set: {
          providers: [
            {
              provide: CartService,
              useValue: mockCartService,
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

  it('should load the collection of carts', async () => {
    const mockCarts = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    mockCartService.getAll.mockImplementation(() => of(mockCarts));

    fixture = TestBed.createComponent(Carts);
    component = fixture.componentInstance;
    await fixture.whenStable();

    expect(component['items'].value()).toEqual(mockCarts);
  });

  it('should delete a cart', async () => {
    mockCartService.getAll.mockReturnValue(of([{ id: 1 }]));
    mockCartService.delete.mockReturnValue(of(undefined));

    fixture = TestBed.createComponent(Carts);
    component = fixture.componentInstance;
    await fixture.whenStable();

    const reloadSpy = vi.spyOn(component['items'], 'reload');

    const tableDebugEl = fixture.debugElement.query(By.directive(Table));
    const tableComponent = tableDebugEl.componentInstance as Table<Cart>;

    tableComponent.delete.emit(1);

    expect(mockCartService.delete).toHaveBeenCalledWith(1);
    expect(reloadSpy).toHaveBeenCalled();
  });
});
