import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SimulacionDePreciosListar} from './simulacion-de-precios-listar/simulacion-de-precios-listar';

@Component({
  selector: 'app-simulacion-de-precios',
  imports: [RouterOutlet, SimulacionDePreciosListar],
  templateUrl: './simulacion-de-precios.html',
  styleUrl: './simulacion-de-precios.css',
})
export class SimulacionDePrecios {
  constructor(public route: ActivatedRoute) { }
}