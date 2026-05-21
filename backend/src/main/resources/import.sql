-- Insertar Autores
INSERT INTO autores (nombre) VALUES ('Gabriel Garcia Marquez');
INSERT INTO autores (nombre) VALUES ('J.K. Rowling');
INSERT INTO autores (nombre) VALUES ('George R.R. Martin');

-- Insertar Libros (asociados a los IDs de los autores usando la FK autor_id)
INSERT INTO libros (titulo, anio_publicacion, genero, isbn, autor_id) VALUES ('Cien anios de soledad', 1967, 'Realismo magico', '978-84-376-0494-7', 1);
INSERT INTO libros (titulo, anio_publicacion, genero, isbn, autor_id) VALUES ('Cronica de una muerte anunciada', 1981, 'Novela', '978-84-9759-229-8', 1);
INSERT INTO libros (titulo, anio_publicacion, genero, isbn, autor_id) VALUES ('Harry Potter y la piedra filosofal', 1997, 'Fantasia', '978-84-9838-434-6', 2);
INSERT INTO libros (titulo, anio_publicacion, genero, isbn, autor_id) VALUES ('Harry Potter y el prisionero de Azkaban', 1999, 'Fantasia', '978-84-9838-437-7', 2);
INSERT INTO libros (titulo, anio_publicacion, genero, isbn, autor_id) VALUES ('Choque de Reyes', 1998, 'Fantasia epica', '978-84-450-7527-1', 3);
