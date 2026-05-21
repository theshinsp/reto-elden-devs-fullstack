import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/autor.model';

@Component({
  selector: 'app-autores-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './autores-lista.component.html'
})
export class AutoresListaComponent implements OnInit {

  // ── Signals ─────────────────────────────────────────
  autores   = signal<Autor[]>([]);
  cargando  = signal<boolean>(true);
  error     = signal<string>('');
  mensaje   = signal<string>('');

  // Signal computado: total de autores
  totalAutores = computed(() => this.autores().length);

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');

    this.autorService.getAll().subscribe({
      next: (data) => {
        this.autores.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al conectar con el servidor. ¿Está el backend corriendo?');
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar este autor? También se eliminarán sus libros.')) return;

    this.autorService.delete(id).subscribe({
      next: () => {
        // Actualizar el Signal filtrando el autor eliminado
        this.autores.update(lista => lista.filter(a => a.id !== id));
        this.mensaje.set('Autor eliminado correctamente.');
        setTimeout(() => this.mensaje.set(''), 3000);
      },
      error: () => {
        this.error.set('Error al eliminar el autor.');
      }
    });
  }
}
