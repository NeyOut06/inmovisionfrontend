// src/app/components/mensaje/mensajelistar/mensajelistar.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';

@Component({
  selector: 'app-mensajelistar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './mensajelistar.html',
  styleUrl: './mensajelistar.css',
})
export class Mensajelistar implements OnInit {
  propiedades: Propiedad[] = [];

  constructor(
    private pS: Propiedadservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.propiedades = data;
    });

    this.pS.getList().subscribe((data) => {
      this.propiedades = data;
    });
  }

  abrirChat(idPropiedad: number): void {
    this.router.navigate(['/mensajes/nuevo'], {
      queryParams: { propiedadId: idPropiedad },
    });
  }

  obtenerImagen(propiedad: Propiedad): string {
    if (propiedad.imagenes && propiedad.imagenes.length > 0) {
      return propiedad.imagenes[0].urlImagen;
    }
    return 'assets/propiedad4.jpg';
  }
}
