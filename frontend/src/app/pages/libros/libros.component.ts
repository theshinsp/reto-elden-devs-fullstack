import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-libros',
  imports: [RouterLink],
  template: `<h2>Libros</h2><a routerLink="/libros/nuevo">Nuevo Libro</a>`,
})
export default class LibrosComponent {}
