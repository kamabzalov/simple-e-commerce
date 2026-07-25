import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';

interface Data {
  id: number;
}

describe('Table', () => {
  let component: Table<Data>;
  let fixture: ComponentFixture<Table<Data>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
