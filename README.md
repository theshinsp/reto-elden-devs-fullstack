# Reto Elden Devs - Fullstack (Biblioteca)

Aplicación web de gestión de biblioteca con Angular 21 + Spring Boot 4 + H2.

---

## Requisitos previos

- **Java 21** (JDK) — necesario para el backend
- **Node.js 20+** y **npm** — necesario para el frontend
- **Angular CLI 21** — `npm install -g @angular/cli`

---

## Backend (Spring Boot)

```bash
cd backend
set JAVA_HOME=C:\Program Files\Java\jdk-21
.\mvnw.cmd spring-boot:run
```

El servidor arranca en **http://localhost:8080**.

### Consola H2

Una vez arrancado el backend, acceder a:
**http://localhost:8080/h2-console**

| Campo | Valor |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:retodb` |
| User Name | `sa` |
| Password | *(vacío)* |

### Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/autores` | Lista todos los autores |
| GET | `/api/autores/{id}` | Obtiene un autor por ID |
| POST | `/api/autores` | Crea un nuevo autor |
| PUT | `/api/autores/{id}` | Actualiza un autor |
| DELETE | `/api/autores/{id}` | Elimina un autor |
| GET | `/api/libros` | Lista todos los libros |
| GET | `/api/libros/{id}` | Obtiene un libro por ID |
| GET | `/api/libros/autor/{autorId}` | Libros de un autor concreto |
| POST | `/api/libros` | Crea un nuevo libro |
| PUT | `/api/libros/{id}` | Actualiza un libro |
| DELETE | `/api/libros/{id}` | Elimina un libro |

### Datos de ejemplo

Al arrancar, se cargan automáticamente:

- **Gabriel García Márquez** → *Cien años de soledad*, *Crónica de una muerte anunciada*
- **J.K. Rowling** → *Harry Potter y la piedra filosofal*, *Harry Potter y el prisionero de Azkaban*
- **George R.R. Martin** → *Choque de Reyes*

---

## Frontend (Angular 21)

```bash
cd frontend
npm install
ng serve
```

La aplicación se abre en **http://localhost:4200**.

### Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Redirige a `/autores` |
| `/autores` | Listado de autores |
| `/autores/nuevo` | Crear nuevo autor |
| `/autores/editar/:id` | Editar autor |
| `/libros` | Listado de libros |
| `/libros/nuevo` | Crear nuevo libro |
| `/libros/editar/:id` | Editar libro |

---

## Verificación rápida

1. Arrancar el backend → `http://localhost:8080`
2. Arrancar el frontend → `http://localhost:4200`
3. Probar la API con curl o Postman:

```bash
curl http://localhost:8080/api/autores
curl http://localhost:8080/api/libros
```

4. En el navegador, abrir `http://localhost:4200` — deberían aparecer los autores y libros cargados desde la base de datos H2.
