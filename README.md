# Reto Elden Devs - Fullstack (Biblioteca)

Aplicación web de gestión de biblioteca con Angular 21 + Spring Boot 4 + H2.

## Equipo

| Nombre | Rol |
|--------|-----|
| **Juan León Navarro** | Backend (Modelos + BD) |
| **Diego Campos Murillo** | Backend (API REST) |
| **Shinsung Park** | Frontend (Estructura + Servicios) |
| **Razvan Crucinschi** | Frontend (Componentes + Formularios) |

---

## Estructura del proyecto

```
reto-elden-devs-fullstack/
│
├── backend/                              # Spring Boot 4 (Java 21)
│   └── src/main/
│       ├── java/com/reto/eldendevs/
│       │   ├── DemoApplication.java      # Punto de entrada de la aplicación
│       │   ├── config/
│       │   │   └── CorsConfig.java       # Configuración CORS (localhost:4200)
│       │   ├── controller/
│       │   │   ├── AutorController.java  # CRUD /api/autores
│       │   │   └── LibroController.java  # CRUD /api/libros
│       │   ├── model/
│       │   │   ├── Autor.java            # Entidad Autor (1) con @OneToMany
│       │   │   └── Libro.java            # Entidad Libro (M) con @ManyToOne
│       │   └── repository/
│       │       ├── AutorRepository.java  # Acceso a BD de autores
│       │       └── LibroRepository.java  # Acceso a BD de libros
│       └── resources/
│           ├── application.yaml          # Config: H2, JPA, consola H2
│           └── import.sql                # Datos de ejemplo (3 autores, 5 libros)
│
├── frontend/                             # Angular 21 (TypeScript)
│   └── src/app/
│       ├── app.component.ts              # Componente raíz (navbar + router-outlet)
│       ├── app.config.ts                 # Proveedores: HttpClient, Router
│       ├── app.routes.ts                 # 6 rutas con lazy loading
│       ├── models/
│       │   ├── autor.model.ts            # Interface Autor
│       │   └── libro.model.ts            # Interface Libro
│       ├── services/
│       │   ├── autor.service.ts          # Llamadas HTTP a /api/autores
│       │   └── libro.service.ts          # Llamadas HTTP a /api/libros
│       └── pages/
│           ├── autores/
│           │   ├── autores-lista/        # Listado de autores (Signals, tabla)
│           │   └── autores-form/         # Formulario crear/editar autor
│           └── libros/
│               ├── libros-lista/         # Listado de libros (Signals, tabla)
│               └── libros-form/          # Formulario crear/editar libro
│
└── README.md                             # Documentación del proyecto
```

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

- **Gabriel García Márquez** → *Cien años de soledad* (Realismo mágico), *Crónica de una muerte anunciada* (Novela)
- **J.K. Rowling** → *Harry Potter y la piedra filosofal* (Fantasía), *Harry Potter y el prisionero de Azkaban* (Fantasía)
- **George R.R. Martin** → *Choque de Reyes* (Fantasía épica)

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

---

## Dificultades encontradas y soluciones

### 1. Base de datos H2 — desconocimiento inicial
Al comenzar el proyecto no sabíamos cómo configurar H2. Solucionamos investigando la configuración en `application.yaml`, estableciendo correctamente las propiedades `spring.datasource.url`, `spring.h2.console.enabled` y `spring.jpa.hibernate.ddl-auto`.

### 2. Arrancar el backend (Spring Boot + Maven)
Tuvimos problemas al ejecutar el backend porque usábamos Java 8 y Spring Boot 4 requiere Java 21. La solución fue instalar JDK 21 y configurar `JAVA_HOME` apuntando a él antes de ejecutar `mvnw spring-boot:run`.

### 3. Conexión frontend-backend (CORS)
Al intentar que Angular (puerto 4200) consumiera la API de Spring Boot (puerto 8080), el navegador bloqueaba las peticiones por CORS. Lo solucionamos creando la clase `CorsConfig.java` que permite explícitamente el origen `http://localhost:4200`.

### 4. Dependencias Spring Boot 4
Spring Boot 4 (4.0.6) usa nombres de dependencias distintos a Spring Boot 3 (ej. `spring-boot-starter-webmvc` en lugar de `spring-boot-starter-web`). Tuvimos que ajustar el `pom.xml` para que Maven descargara las dependencias correctas.

### 5. Import SQL con error de sintaxis
En `import.sql`, un `autor_id` tenía el valor `2026-29` en lugar de `2`, lo que H2 interpretaba como una resta matemática. Se corrigió cambiando el valor al ID correcto del autor.

### 6. Entidades JPA sin constructor vacío
Hibernate requiere un constructor sin argumentos en las entidades. Las clases `Autor` y `Libro` no lo tenían, causando warnings. Se añadió `public Autor() {}` y `public Libro() {}`.

### 7. Serialización JSON — nombre del campo
El campo `nombre` en `Autor` se serializaba como `"nombre"` pero queríamos que apareciera como `"autor"` en el JSON. Renombramos el campo en Java a `autor` manteniendo la columna en base de datos como `nombre` mediante `@Column(name="nombre")`.

### 8. Versiones de dependencias
El proyecto fue generado con `start.spring.io` usando Spring Boot 4.0.6, que es una versión muy reciente con cambios respecto a versiones anteriores. Tuvimos que verificar que todas las dependencias en `pom.xml` fueran compatibles.

### 9. Angular 19 a 21 — migración de dependencias
El frontend se generó inicialmente con Angular 19, pero los requisitos pedían Angular 21. Al hacer `npm install @angular/core@21`, se producían conflictos porque `@angular-devkit/build-angular` (v19) seguía presente y no era compatible con Angular 21. Se solucionó eliminando `@angular-devkit/build-angular`, moviendo `@angular/build` a `devDependencies`, y actualizando el `angular.json` para usar los builders `@angular/build:application` y `@angular/build:dev-server` en lugar de los antiguos `@angular-devkit/build-angular:*`. Tras una instalación limpia, todas las dependencias quedaron en Angular 21.2.14.

---

## Posibles mejoras (no implementadas)

Consultamos a una IA qué mejoras podría tener el proyecto y estas son las sugerencias que nos dio, aunque no las hemos implementado por falta de tiempo:

- **Capa de servicios en el backend**: Separar la lógica de negocio de los controladores creando servicios intermedios (`AutorService`, `LibroService`) en lugar de llamar a los repositorios directamente desde los controladores.
- **DTOs (Data Transfer Objects)**: Crear objetos específicos para las peticiones y respuestas de la API en lugar de exponer las entidades JPA directamente, mejorando la seguridad y el control sobre los datos devueltos.
- **Manejo global de errores**: Implementar `@ControllerAdvice` para centralizar el manejo de excepciones y devolver respuestas uniformes en caso de error.
- **Búsqueda y filtros**: Añadir un campo de búsqueda para filtrar libros por título, autor o género, y filtros por año de publicación.
- **Paginación**: Implementar paginación en los listados de autores y libros para mejorar el rendimiento con muchos registros.
- **Seguridad básica**: Añadir autenticación con login y protección de rutas mediante guards en Angular.
- **Limpieza de código muerto**: El componente `components/autor-list/` contiene datos hardcodeados y no está integrado en el enrutador; se podría eliminar o convertir en un componente reutilizable.
- **Pruebas**: Añadir tests unitarios y de integración tanto en frontend (Jasmine/Karma) como en backend (JUnit).
