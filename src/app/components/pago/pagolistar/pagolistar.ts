import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Pago } from '../../../models/pago';
import { Pagoservice } from '../../../services/pagoservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './pagolistar.html',
  styleUrl: './pagolistar.css',
})
export class Pagolistar implements OnInit {

  pagos: Pago[] = []; // Array para @for
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'acciones'
  ];

  constructor(private pS: Pagoservice, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.pagos = data; // Guarda en el array
      this.dataSource = new MatTableDataSource(data);
    });

    this.pS.getList().subscribe(data => {
      this.pagos = data; // Guarda en el array
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pagos = data; // Actualiza el array
        this.dataSource = new MatTableDataSource(data);
        this.pS.setList(data);
      });
    });
  }
}