export interface Autor {
  id?:     number;
  autor:   string;
  libros?: Libro[];
}

import { Libro } from './libro.model';
