import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Distritolistar } from './distritolistar/distritolistar';

@Component({
  selector: 'app-distrito',
  imports: [RouterOutlet, Distritolistar],
  templateUrl: './distrito.html',
  styleUrl: './distrito.css',
})
export class Distrito {
  constructor(public route:ActivatedRoute){}
}
