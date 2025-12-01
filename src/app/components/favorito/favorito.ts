import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Favoritolistar } from './favoritolistar/favoritolistar';

@Component({
  selector: 'app-favorito',
  imports: [RouterOutlet, Favoritolistar],
  templateUrl: './favorito.html',
  styleUrl: './favorito.css',
})
export class Favorito {
  constructor(public route: ActivatedRoute) {}
}