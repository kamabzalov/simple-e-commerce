import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const isAdminGuard: CanActivateFn = () => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const router = inject(Router);
  if (isBrowser) {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    router.navigate(['/']);
    return false;
  }
  return false;
};
