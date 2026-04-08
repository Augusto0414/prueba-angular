import { Routes } from '@angular/router';
import { CategoriesPage } from './features/categories/pages/categories.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesPage,
    data: { title: 'Gestión de Categorías' }
  },
  {
    path: '**',
    redirectTo: '/categories'
  }
];
