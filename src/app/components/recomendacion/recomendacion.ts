import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecomendacionListar } from './recomendacionlistar/recomendacionlistar';

@Component({
  selector: 'app-recomendacion',
  imports: [RouterOutlet,RecomendacionListar],
  templateUrl: './recomendacion.html',
  styleUrl: './recomendacion.css',
})
export class Recomendacion {
constructor(public route:ActivatedRoute){}
}


