import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './autores-form.component.html'
})
export class AutoresFormComponent implements OnInit {

  // ── Signals ──────────────────────────────────────────
  editando  = signal<boolean>(false);
  guardando = signal<boolean>(false);
  error     = signal<string>('');

  // ── Formulario reactivo ──────────────────────────────
  form: FormGroup;
  private id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Definir el formulario con validaciones
    this.form = this.fb.group({
      nombre:       ['', [Validators.required, Validators.minLength(2)]],
      apellidos:    ['', [Validators.required, Validators.minLength(2)]],
      nacionalidad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || null;

    if (this.id) {
      this.editando.set(true);
      this.autorService.getById(this.id).subscribe({
        next: (autor) => {
          // Rellenar el formulario con los datos existentes
          this.form.patchValue(autor);
        },
        error: () => {
          this.error.set('No se pudo cargar el autor.');
        }
      });
    }
  }

  // Getters para acceder fácil a los campos en el HTML
  get nombre()       { return this.form.get('nombre'); }
  get apellidos()    { return this.form.get('apellidos'); }
  get nacionalidad() { return this.form.get('nacionalidad'); }

  guardar(): void {
    // Marcar todos los campos como tocados para mostrar errores
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.guardando.set(true);
    this.error.set('');

    const operacion = this.editando()
      ? this.autorService.update(this.id!, this.form.value)
      : this.autorService.create(this.form.value);

    operacion.subscribe({
      next:  () => { this.router.navigate(['/autores']); },
      error: () => {
        this.error.set('Error al guardar. Comprueba la conexión con el backend.');
        this.guardando.set(false);
      }
    });
  }
}
