import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // para que Angular acepte <a-scene>, <a-sky>, etc.
})
export class Home {

  constructor(public loginService: LoginService) {}
  scrollToSimulador(event: Event): void {
    event.preventDefault(); // evita navegación rara / recarga
    const target = document.getElementById('simulador');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
