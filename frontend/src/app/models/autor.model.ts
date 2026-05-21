export interface Autor {
  id?:         number;
  nombre:      string;
  apellidos:   string;
  nacionalidad: string;
  libros?:     Libro[];  // relación 1:M
}

// Importación circular evitada con forward reference
import { Libro } from './libro.model';
