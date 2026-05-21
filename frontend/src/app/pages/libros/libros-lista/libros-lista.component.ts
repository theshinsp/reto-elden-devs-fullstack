import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { Libro } from '../../../models/libro.model';
import { Autor } from '../../../models/autor.model';

@Component({
  selector: 'app-libros-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './libros-lista.component.html'
})
export class LibrosListaComponent implements OnInit {

  // ── Signals ──────────────────────────────────────────
  libros   = signal<Libro[]>([]);
  autores  = signal<Autor[]>([]);
  cargando = signal<boolean>(true);
  error    = signal<string>('');
  mensaje  = signal<string>('');

  // Signal computado: total de libros
  totalLibros = computed(() => this.libros().length);

  constructor(
    private libroService: LibroService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    this.cargarAutores();
    this.cargarLibros();
  }

  cargarAutores(): void {
    this.autorService.getAll().subscribe({
      next: (data) => this.autores.set(data)
    });
  }

  cargarLibros(): void {
    this.cargando.set(true);
    this.libroService.getAll().subscribe({
      next: (data) => {
        this.libros.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al conectar con el servidor.');
        this.cargando.set(false);
      }
    });
  }

  // Método para obtener el nombre del autor a partir de su ID
  getNombreAutor(autorId: number): string {
    const autor = this.autores().find(a => a.id === autorId);
    return autor ? `${autor.nombre} ${autor.apellidos}` : 'Desconocido';
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar este libro?')) return;

    this.libroService.delete(id).subscribe({
      next: () => {
        this.libros.update(lista => lista.filter(l => l.id !== id));
        this.mensaje.set('Libro eliminado correctamente.');
        setTimeout(() => this.mensaje.set(''), 3000);
      },
      error: () => {
        this.error.set('Error al eliminar el libro.');
      }
    });
  }
}
