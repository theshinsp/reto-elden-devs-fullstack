-- Insertar Autores
INSERT INTO autores (nombre) VALUES ('Gabriel García Márquez');
INSERT INTO autores (nombre) VALUES ('J.K. Rowling');
INSERT INTO autores (nombre) VALUES ('George R.R. Martin');

-- Insertar Libros (asociados a los IDs de los autores usando la FK autor_id)
INSERT INTO libros (titulo, anio_publicacion, autor_id) VALUES ('Cien años de soledad', 1967, 1);
INSERT INTO libros (titulo, anio_publicacion, autor_id) VALUES ('Crónica de una muerte anunciada', 1981, 1);

INSERT INTO libros (titulo, anio_publicacion, autor_id) VALUES ('Harry Potter y la piedra filosofal', 1997, 2);
INSERT INTO libros (titulo, anio_publicacion, autor_id) VALUES ('Harry Potter y el prisionero de Azkaban', 1999, 2);

INSERT INTO libros (titulo, anio_publicacion, autor_id) VALUES ('Choque de Reyes', 1998, 3);