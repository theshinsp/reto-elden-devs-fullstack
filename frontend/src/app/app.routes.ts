import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  {
    path: 'libros',
    loadComponent: () => import('./pages/libros/libros.component'),
  },
  {
    path: 'libros/nuevo',
    loadComponent: () => import('./pages/libros/libro-form.component'),
  },
  {
    path: 'libros/:id',
    loadComponent: () => import('./pages/libros/libro-form.component'),
  },
  {
    path: 'categorias',
    loadComponent: () => import('./pages/categorias/categorias.component'),
  },
  {
    path: 'categorias/nueva',
    loadComponent: () => import('./pages/categorias/categoria-form.component'),
  },
  {
    path: 'categorias/:id',
    loadComponent: () => import('./pages/categorias/categoria-form.component'),
  },
];
