import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a class="brand" routerLink="/">📚 Biblioteca</a>
      <a routerLink="/autores" routerLinkActive="active-link">Autores</a>
      <a routerLink="/libros"  routerLinkActive="active-link">Libros</a>
    </nav>
    <router-outlet />
  `
})
export class AppComponent {}
