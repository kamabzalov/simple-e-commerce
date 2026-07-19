import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [TitleCasePipe, CurrencyPipe, RouterLink, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table<T extends { id: number }> {
  public columns = input.required<(keyof T & string)[]>();
  public data = input.required<T[]>();
  public entityName = input.required<string>();

  public delete = output<number>();

  protected emitDelete(id: number) {
    this.delete.emit(id);
  }
}
