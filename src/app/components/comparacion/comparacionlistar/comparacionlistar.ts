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

@Component({
  selector: 'app-comparacionlistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './comparacionlistar.html',
  styleUrl: './comparacionlistar.css',
})
export class Comparacionlistar implements OnInit {
  comparaciones: Comparacion[] = [];
  dataSource: MatTableDataSource<Comparacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  propiedades: Propiedad[] = [];

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
        this.dataSource = new MatTableDataSource(this.comparaciones);
        
        console.log('Comparaciones cargadas con imágenes:', this.comparaciones);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });

    // Suscribirse a cambios en tiempo real
    this.cS.getList().subscribe((data) => {
      this.comparaciones = data;
      this.dataSource = new MatTableDataSource(data);
    });

    this.pS.getList().subscribe((data) => {
      this.propiedades = data;
    });
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