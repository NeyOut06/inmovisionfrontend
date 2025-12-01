import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Calificacion } from '../../../models/Calificacion';
import { CalificacionService } from '../../../services/calificacionservice';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calificacionlistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './calificacionlistar.html',
  styleUrl: './calificacionlistar.css',
})
export class Calificacionlistar implements OnInit {

  dataSource: MatTableDataSource<Calificacion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'a', // id
    'b', // puntuacion
    'c', // fecha
    'd', // estado
    'e', // usuario
    'f', // propiedad
    'g', // editar
    'h'  // eliminar
  ];

  constructor(private cS: CalificacionService, public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
      });
    });
  }

}
