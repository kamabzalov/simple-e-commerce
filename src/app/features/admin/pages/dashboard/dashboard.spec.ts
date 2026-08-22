import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter, Router } from '@angular/router';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideTranslateService(), provideRouter([])],
    }).compileComponents();

    const router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home app page after logout', async () => {
    localStorage.setItem('token', 'some-token');

    await component['logout']();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(localStorage.getItem('token')).toBeNull();
  });
});
