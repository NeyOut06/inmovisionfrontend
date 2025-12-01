import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SimulacionPrecios } from '../../../models/simulacion-de-precios';
import { SimulacionDePreciosService } from '../../../services/simulacion-de-precios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulacion-de-precios-listar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './simulacion-de-precios-listar.html',
  styleUrl: './simulacion-de-precios-listar.css',
})
export class SimulacionDePreciosListar implements OnInit {
  dataSource: MatTableDataSource<SimulacionPrecios> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1', // ID
    'c2', // Usuario
    'c3', // Propiedad
    'c4', // Monto inicial
    'c5', // Tasa intereses
    'c6', // Plazo meses
    'c7', // Cuota mensual
    'c8', // Fecha
    'acciones',
  ];

  constructor(
    private sS: SimulacionDePreciosService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}