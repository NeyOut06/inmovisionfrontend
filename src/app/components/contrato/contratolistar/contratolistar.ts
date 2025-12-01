import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Contrato } from '../../../models/contrato';
import { Contratoservice } from '../../../services/contratoservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contratolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './contratolistar.html',
  styleUrl: './contratolistar.css',
})
export class Contratolistar implements OnInit {

  contratos: Contrato[] = []; // Array para @for
  dataSource: MatTableDataSource<Contrato> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'
  ];

  constructor(private cS: Contratoservice, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.contratos = data; // Guarda en el array
      this.dataSource = new MatTableDataSource(data); // Para si lo necesitas después
    });

    this.cS.getList().subscribe(data => {
      this.contratos = data; // Guarda en el array
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.contratos = data; // Actualiza el array
        this.dataSource = new MatTableDataSource(data);
        this.cS.setList(data);
      });
    });
  }
}