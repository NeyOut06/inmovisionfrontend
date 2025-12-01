import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Listafavoritoservice } from '../../../services/listafavoritoservice';
import { ListaFavorito } from '../../../models/ListaFavorito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-favoritoslistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './lista_favoritoslistar.html',
  styleUrl: './lista_favoritoslistar.css',
})
export class Lista_favoritoslistar implements OnInit {
  dataSource: MatTableDataSource<ListaFavorito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(
    private lfS: Listafavoritoservice,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.lfS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.lfS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.lfS.delete(id).subscribe((data) => {
      this.lfS.list().subscribe((data) => {
        this.lfS.setList(data);
      });
    });
  }
}