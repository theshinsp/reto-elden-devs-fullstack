import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/autor.model';

@Component({
  selector: 'app-libros-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './libros-form.component.html'
})
export class LibrosFormComponent implements OnInit {

  // ── Signals ──────────────────────────────────────────
  editando  = signal<boolean>(false);
  guardando = signal<boolean>(false);
  error     = signal<string>('');
  autores   = signal<Autor[]>([]);

  // ── Formulario reactivo ──────────────────────────────
  form: FormGroup;
  private id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      titulo:          ['', [Validators.required, Validators.minLength(2)]],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      genero:          ['', [Validators.required]],
      isbn:            ['', [Validators.required, Validators.pattern(/^[0-9\-]{10,17}$/)]],
      autorId:         ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Cargar lista de autores para el select
    this.autorService.getAll().subscribe({
      next: (data) => this.autores.set(data),
      error: () => this.error.set('No se pudieron cargar los autores.')
    });

    // Si es edición, cargar datos del libro
    this.id = Number(this.route.snapshot.paramMap.get('id')) || null;
    if (this.id) {
      this.editando.set(true);
      this.libroService.getById(this.id).subscribe({
        next: (libro) => this.form.patchValue(libro),
        error: () => this.error.set('No se pudo cargar el libro.')
      });
    }
  }

  // Getters para el HTML
  get titulo()          { return this.form.get('titulo'); }
  get anioPublicacion() { return this.form.get('anioPublicacion'); }
  get genero()          { return this.form.get('genero'); }
  get isbn()            { return this.form.get('isbn'); }
  get autorId()         { return this.form.get('autorId'); }

  guardar(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.guardando.set(true);
    this.error.set('');

    const operacion = this.editando()
      ? this.libroService.update(this.id!, this.form.value)
      : this.libroService.create(this.form.value);

    operacion.subscribe({
      next:  () => { this.router.navigate(['/libros']); },
      error: () => {
        this.error.set('Error al guardar. Comprueba la conexión con el backend.');
        this.guardando.set(false);
      }
    });
  }
}
