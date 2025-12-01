import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Mensajelistar } from './mensajelistar/mensajelistar';


@Component({
  selector: 'app-mensaje',
  imports: [RouterOutlet,Mensajelistar],
  templateUrl: './mensaje.html',
  styleUrl: './mensaje.css',
})
export class Mensaje {
  constructor(public route:ActivatedRoute){}
}
