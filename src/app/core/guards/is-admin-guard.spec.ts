import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { isAdminGuard } from './is-admin-guard';

describe('isAdminGuard', () => {
  let router: { navigate: ReturnType<typeof vi.fn> };
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAdminGuard(...guardParameters));

  beforeEach(() => {
    router = { navigate: vi.fn() };
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: router }],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if token is present', () => {
    localStorage.setItem('token', 'fake-token');

    executeGuard({} as never, {} as never);

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return falsr if token is not present and not navigate', () => {
    localStorage.setItem('token', '');

    executeGuard({} as never, {} as never);

    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenLastCalledWith(['/']);
  });
});
