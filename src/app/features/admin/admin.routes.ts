import { Routes } from '@angular/router';
import { LoginForm } from './pages/login/login-form';
import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { isAdminGuard } from '../../core/guards/is-admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginForm,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [isAdminGuard],
    children: [
      {
        path: '',
        component: Products,
      },
      {
        path: 'carts',
        loadComponent: () => import('./pages/carts/carts').then(c => c.Carts),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then(c => c.Users),
      },
    ],
  },
];
