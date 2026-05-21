import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [RouterLink],
  template: `<h2>Categorías</h2><a routerLink="/categorias/nueva">Nueva Categoría</a>`,
})
export default class CategoriasComponent {}
