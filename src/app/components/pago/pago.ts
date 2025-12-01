import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Pagolistar } from './pagolistar/pagolistar';

@Component({
  selector: 'app-pago',
  imports: [RouterOutlet, Pagolistar],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago {
  constructor(public route: ActivatedRoute) { }
}