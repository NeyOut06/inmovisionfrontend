import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Favoritoservice } from '../../../services/favoritoservice';
import { Favorito } from '../../../models/Favorito';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-favoritolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './favoritolistar.html',
  styleUrl: './favoritolistar.css',
})
export class Favoritolistar implements OnInit {
  favoritos: Favorito[] = [];       
  dataPaginada: Favorito[] = [];    
  
    // PAGINACIÓN
  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 3;
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(
    private fS: Favoritoservice,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fS.list().subscribe(data => {
      this.favoritos = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.fS.getList().subscribe(data => {
      this.favoritos = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });
  }

  actualizarPaginado() {
    const start = this.paginaActual * this.tamanioPagina;
    const end = start + this.tamanioPagina;

    this.dataPaginada = this.favoritos.slice(start, end);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.actualizarPaginado();
  }

  eliminar(id: number) {
    this.fS.delete(id).subscribe((data) => {
      this.fS.list().subscribe((data) => {
        this.fS.setList(data);
      });
    });
  }
}