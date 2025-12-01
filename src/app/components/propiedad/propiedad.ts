import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Propiedadlistar } from './propiedadlistar/propiedadlistar';

@Component({
  selector: 'app-propiedad',
  imports: [RouterOutlet, Propiedadlistar],
  templateUrl: './propiedad.html',
  styleUrl: './propiedad.css',
})
export class Propiedad {
  constructor(public route:ActivatedRoute){}

}
