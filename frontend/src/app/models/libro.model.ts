import type { Categoria } from './categoria.model';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  anioPublicacion: number;
  disponible: boolean;
  categoria: Categoria;
}
