import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Comparacionlistar } from './comparacionlistar/comparacionlistar';

@Component({
  selector: 'app-comparacion',
  imports: [RouterOutlet, Comparacionlistar],
  templateUrl: './comparacion.html',
  styleUrl: './comparacion.css',
})
export class Comparacion {
  constructor(public route:ActivatedRoute){}
}
