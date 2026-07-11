import { Routes } from '@angular/router';
import { Home } from './features/shop/pages/home/home';
import { Shop } from './features/shop/shop';

export const routes: Routes = [
  {
    path: '',
    component: Shop,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/shop/pages/product/product').then(c => c.ProductDetails),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(r => r.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
