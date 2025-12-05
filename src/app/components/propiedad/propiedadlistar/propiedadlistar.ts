import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login-service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-propiedadlistar',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './propiedadlistar.html',
  styleUrls: ['./propiedadlistar.css'],
})
export class Propiedadlistar implements OnInit {
  dataSource: Propiedad[] = [];
  dataPaginada: Propiedad[] = [];
  
  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 3;

  // Propiedad seleccionada para ver detalles
  selectedPropiedad: Propiedad | null = null;

  constructor(
    private dS: Propiedadservice,
    private router: Router,
    public route: ActivatedRoute,
    public loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.dS.list().subscribe(data => {
      this.dataSource = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.dS.getList().subscribe(data => {
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

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }

  verUbicacion(idPropiedad: number) {
    this.router.navigate(['/propiedades', idPropiedad, 'mapa']);
  }

  verDetalles(propiedad: Propiedad) {
    this.selectedPropiedad = propiedad;
  }

  cerrarDetalles() {
    this.selectedPropiedad = null;
  }
}
