import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Visitalistar } from './visitalistar/visitalistar';

@Component({
  selector: 'app-visita',
  imports: [RouterOutlet, Visitalistar],
  templateUrl: './visita.html',
  styleUrl: './visita.css',
})
export class Visita {
      constructor(public route:ActivatedRoute){}
}
