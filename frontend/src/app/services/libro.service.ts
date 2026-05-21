import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';

@Injectable({ providedIn: 'root' })
export class LibroService {

  private apiUrl = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // Obtener libro por ID
  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // Obtener libros de un autor concreto
  getByAutor(autorId: number): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/autor/${autorId}`);
  }

  // Crear nuevo libro
  create(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // Actualizar libro existente
  update(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // Eliminar libro
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
