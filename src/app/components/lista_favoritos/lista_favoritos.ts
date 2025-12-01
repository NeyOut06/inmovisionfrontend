import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Lista_favoritoslistar } from './lista_favoritoslistar/lista_favoritoslistar';

@Component({
  selector: 'app-lista-favoritos',
  imports: [RouterOutlet, Lista_favoritoslistar],
  templateUrl: './lista_favoritos.html',
  styleUrl: './lista_favoritos.css',
})
export class Lista_favoritos {
  constructor(public route: ActivatedRoute) {}
}