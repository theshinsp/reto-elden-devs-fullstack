import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  templateUrl: './autor-list.html',
  styleUrl: './autor-list.css'
})
export class AutorList {
  autores = signal([
    { id: 1, autor: 'Gabriel Garcia Marquez' },
    { id: 2, autor: 'Miguel de Cervantes' },
    { id: 3, autor: 'Julio Verne' }
  ]);
}
