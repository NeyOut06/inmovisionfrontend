// src/app/components/mensaje/mensajelistar/mensajelistar.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-mensajelistar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './mensajelistar.html',
  styleUrl: './mensajelistar.css',
})
export class Mensajelistar implements OnInit {
  dataSource: Propiedad[] = [];
  dataPaginada: Propiedad[] = [];
  
  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 3;

  constructor(
    private pS: Propiedadservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.pS.getList().subscribe((data) => {
      this.dataSource = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });
  }

  actualizarPaginado() {
    const start = this.paginaActual * this.tamanioPagina;
    const end = start + this.tamanioPagina;

    this.dataPaginada = this.dataSource.slice(start, end);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.actualizarPaginado();
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
