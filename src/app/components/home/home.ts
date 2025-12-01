// src/app/components/home/home.ts
import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // para que Angular acepte <a-scene>, <a-sky>, etc.
})
export class Home   {
  
  scrollToSimulador(event: Event): void {
  event.preventDefault(); // evita navegación rara / recarga
  const target = document.getElementById('simulador');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
}
