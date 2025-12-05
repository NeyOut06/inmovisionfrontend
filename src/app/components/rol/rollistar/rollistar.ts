import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rollistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule,RouterLink, CommonModule, MatPaginator],
  templateUrl: './rollistar.html',
  styleUrl: './rollistar.css',
})
export class Rollistar implements OnInit {
  dataSource: Rol[] = [];
  dataPaginada: Rol[] = [];

  totalRegistros = 0;
  paginaActual = 0;
  tamanioPagina = 4;

  constructor(private rS:Rolservice, public route:ActivatedRoute){}

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = data;
      this.totalRegistros = data.length;
      this.actualizarPaginado();
    });

    this.rS.getList().subscribe(data => {
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
    this.rS.delete(id).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    })
  }

}
