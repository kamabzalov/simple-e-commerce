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
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'products/add-product',
        loadComponent: () => import('./pages/product/product').then(c => c.ProductDetails),
        data: {
          isNew: true,
        },
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/product/product').then(c => c.ProductDetails),
      },
      {
        path: 'carts',
        loadComponent: () => import('./pages/carts/carts').then(c => c.Carts),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then(c => c.Users),
      },
      {
        path: 'users/add-user',
        loadComponent: () => import('./pages/user/user').then(c => c.UserDetails),
        data: {
          isNew: true,
        },
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./pages/user/user').then(c => c.UserDetails),
      },
    ],
  },
];
