import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForm } from './login-form';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter, Router } from '@angular/router';
import { submit } from '@angular/forms/signals';
import { Auth } from '../../services/auth/auth';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  const authServiceMock = {
    login: vi.fn(),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [provideTranslateService(), provideRouter([])],
    }).overrideComponent(LoginForm, {
      set: {
        providers: [{ provide: Auth, useValue: authServiceMock }],
      },
    });

    const router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component['loginForm']().invalid()).toBe(true);
  });

  it('should be invalid when username is empty', () => {
    component['loginModel'].set({ username: '   ', password: 'password' });

    expect(component['loginForm'].username().valid()).toBe(false);
    expect(component['loginForm'].password().valid()).toBe(true);
    expect(component['loginForm']().invalid()).toBe(true);
  });

  it('should be invalid when password is empty', () => {
    component['loginModel'].set({ username: 'username', password: '' });

    expect(component['loginForm'].username().valid()).toBe(true);
    expect(component['loginForm'].password().valid()).toBe(false);
    expect(component['loginForm']().invalid()).toBe(true);
  });

  it('should submit form with valid login data and redirect to dashboard', async () => {
    component['loginModel'].set({ username: 'username', password: 'password' });
    authServiceMock.login.mockReturnValue(of({ token: 'token' }));

    await submit(component['loginForm']);

    expect(authServiceMock.login).toHaveBeenCalledWith('username', 'password');
    expect(localStorage.getItem('token')).toBe('token');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/dashboard']);
  });

  it('should submit form with invalid login data and set form error', async () => {
    component['loginModel'].set({ username: 'invalidLogin', password: 'invalidPassword' });
    authServiceMock.login.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 401 })));

    await submit(component['loginForm']);

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(component['loginForm']().errors()).toBeTruthy();
  });
});
