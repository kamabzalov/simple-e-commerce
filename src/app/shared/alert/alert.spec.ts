import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alert } from './alert';
import { provideTranslateService } from '@ngx-translate/core';

describe('Alert', () => {
  let component: Alert;
  let fixture: ComponentFixture<Alert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alert],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(Alert);
    fixture.componentRef.setInput('alertText', 'Alert text');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Alert text');
  });
});
