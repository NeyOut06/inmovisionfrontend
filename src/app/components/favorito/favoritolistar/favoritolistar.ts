import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Favoritoservice } from '../../../services/favoritoservice';
import { Favorito } from '../../../models/Favorito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './favoritolistar.html',
  styleUrl: './favoritolistar.css',
})
export class Favoritolistar implements OnInit {
  dataSource: MatTableDataSource<Favorito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(
    private fS: Favoritoservice,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.fS.delete(id).subscribe((data) => {
      this.fS.list().subscribe((data) => {
        this.fS.setList(data);
      });
    });
  }
}