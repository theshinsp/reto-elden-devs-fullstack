export interface Libro {
  id?:          number;
  titulo:       string;
  anioPublicacion: number;
  genero:       string;
  isbn:         string;
  autorId:      number;
  autorNombre?: string; // campo calculado para mostrar en la vista
}
