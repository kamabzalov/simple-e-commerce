import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

interface Data {
  id: number;
}

describe('Table', () => {
  let component: Table<Data>;
  let fixture: ComponentFixture<Table<Data>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);

    fixture.componentRef.setInput('columns', []);
    fixture.componentRef.setInput('data', []);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render without router errors when data is present', () => {
    fixture.componentRef.setInput('data', [{ id: 1 }]);
    fixture.componentRef.setInput('columns', ['id']);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should emit delete with correct id', () => {
    fixture.componentRef.setInput('data', [{ id: 1 }, { id: 2 }]);
    fixture.componentRef.setInput('columns', ['id']);
    fixture.detectChanges();

    let itemId = null;

    component.delete.subscribe(id => (itemId = id));

    const deleteButtons: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll(
      '[data-testid="delete-button"]'
    );
    expect(deleteButtons.length).toEqual(2);

    deleteButtons[1].click();

    expect(itemId).toEqual(2);
  });
});
