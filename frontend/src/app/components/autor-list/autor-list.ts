import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-autor-list',

  standalone: true,

  templateUrl: './autor-list.html',

  styleUrl: './autor-list.css'
})

export class AutorList {

  // SIGNAL
  autores = signal([

    {
      id: 1,
      nombre: 'Gabriel García Márquez',
      nacionalidad: 'Colombia'
    },

    {
      id: 2,
      nombre: 'Miguel de Cervantes',
      nacionalidad: 'España'
    },

    {
      id: 3,
      nombre: 'Julio Verne',
      nacionalidad: 'Francia'
    }

  ]);

}