import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Pago } from '../../../models/pago';
import { Pagoservice } from '../../../services/pagoservice';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pagolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './pagolistar.html',
  styleUrl: './pagolistar.css',
})
export class Pagolistar implements OnInit {

  pagos: Pago[] = []; // Array para @for
  dataPaginada: Pago[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 3;

  constructor(private pS: Pagoservice, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.pagos = data; // Guarda en el array
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.pS.getList().subscribe(data => {
      this.pagos = data; // Guarda en el array
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });
  }

  actualizarPaginado() {
    const start = this.paginaActual * this.tamanioPagina;
    const end = start + this.tamanioPagina;
    this.dataPaginada = this.pagos.slice(start, end);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.actualizarPaginado();
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pagos = data; // Actualiza el array
        this.pS.setList(data);
      });
    });
  }
}