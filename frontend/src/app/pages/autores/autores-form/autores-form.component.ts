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

  editando  = signal<boolean>(false);
  guardando = signal<boolean>(false);
  error     = signal<string>('');

  form: FormGroup;
  private id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      autor: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || null;

    if (this.id) {
      this.editando.set(true);
      this.autorService.getById(this.id).subscribe({
        next: (autor) => {
          this.form.patchValue(autor);
        },
        error: () => {
          this.error.set('No se pudo cargar el autor.');
        }
      });
    }
  }

  get autor() { return this.form.get('autor'); }

  guardar(): void {
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
        this.error.set('Error al guardar. Comprueba la conexion con el backend.');
        this.guardando.set(false);
      }
    });
  }
}
