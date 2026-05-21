import { Component } from '@angular/core';

import { AutorList } from './components/autor-list';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [AutorList],

  template: `
    <app-autor-list />
  `
})

export class App {

}