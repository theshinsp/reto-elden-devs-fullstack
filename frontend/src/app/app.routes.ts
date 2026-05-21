import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige la raíz a autores
  {
    path: '',
    redirectTo: 'autores',
    pathMatch: 'full'
  },

  // ── Autores (lazy loading) ──────────────────────────
  {
    path: 'autores',
    loadComponent: () =>
      import('./pages/autores/autores-lista/autores-lista.component')
        .then(m => m.AutoresListaComponent)
  },
  {
    path: 'autores/nuevo',
    loadComponent: () =>
      import('./pages/autores/autores-form/autores-form.component')
        .then(m => m.AutoresFormComponent)
  },
  {
    path: 'autores/editar/:id',
    loadComponent: () =>
      import('./pages/autores/autores-form/autores-form.component')
        .then(m => m.AutoresFormComponent)
  },

  // ── Libros (lazy loading) ───────────────────────────
  {
    path: 'libros',
    loadComponent: () =>
      import('./pages/libros/libros-lista/libros-lista.component')
        .then(m => m.LibrosListaComponent)
  },
  {
    path: 'libros/nuevo',
    loadComponent: () =>
      import('./pages/libros/libros-form/libros-form.component')
        .then(m => m.LibrosFormComponent)
  },
  {
    path: 'libros/editar/:id',
    loadComponent: () =>
      import('./pages/libros/libros-form/libros-form.component')
        .then(m => m.LibrosFormComponent)
  },

  // Ruta no encontrada
  { path: '**', redirectTo: 'autores' }
];
