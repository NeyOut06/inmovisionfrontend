import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Calificacionlistar } from './calificacionlistar/calificacionlistar';

@Component({
  selector: 'app-calificacion',
  imports: [Calificacionlistar, RouterOutlet],
  templateUrl: './calificacion.html',
  styleUrl: './calificacion.css',
})
export class Calificacion {
    constructor(public route:ActivatedRoute ){}


}
