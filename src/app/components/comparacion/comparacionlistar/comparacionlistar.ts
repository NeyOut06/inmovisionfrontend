import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Comparacion } from '../../../models/Comparacion';
import { Comparacionservice } from '../../../services/comparacionservice';
import { Propiedad } from '../../../models/Propiedad'; // Cambiar import
import { Propiedadservice } from '../../../services/propiedadservice';
import { LoginService } from '../../../services/login-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-comparacionlistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './comparacionlistar.html',
  styleUrl: './comparacionlistar.css',
})
export class Comparacionlistar implements OnInit {
  comparaciones: Comparacion[] = [];
  comparacionesPaginadas: Comparacion[] = [];
  propiedades: Propiedad[] = [];

  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 3;

  constructor(private cS: Comparacionservice, private pS: Propiedadservice , public loginservice: LoginService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar comparaciones y propiedades en paralelo
    forkJoin({
      comparaciones: this.cS.list(),
      propiedades: this.pS.list()
    }).subscribe({
      next: (resultado) => {
        // Enriquecer comparaciones con las imágenes de las propiedades
        this.comparaciones = resultado.comparaciones.map(comp => {
          // Buscar las propiedades completas con sus imágenes
          const prop1 = resultado.propiedades.find(p => p.idPropiedad === comp.propiedad1.idPropiedad);
          const prop2 = resultado.propiedades.find(p => p.idPropiedad === comp.propiedad2.idPropiedad);

          return {
            ...comp,
            propiedad1: prop1 || comp.propiedad1,
            propiedad2: prop2 || comp.propiedad2
          };
        });

        this.propiedades = resultado.propiedades;
        this.totalRegistros = this.comparaciones.length;
        this.actualizarPaginado();
        
        console.log('Comparaciones cargadas con imágenes:', this.comparaciones);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });

    // Suscribirse a cambios en tiempo real
    this.cS.getList().subscribe((data) => {
      this.comparaciones = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.pS.getList().subscribe((data) => {
      this.propiedades = data;
    });
  }

  actualizarPaginado() {
    const start = this.paginaActual * this.tamanioPagina;
    const end = start + this.tamanioPagina;
    this.comparacionesPaginadas = this.comparaciones.slice(start, end);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.actualizarPaginado();
  }

  eliminar(id: number): void {
    this.cS.delete(id).subscribe({
      next: () => {
        this.cargarDatos(); // Recarga todos los datos
      },
      error: (error) => {
        console.error('Error eliminando comparación:', error);
      }
    });
  }
}