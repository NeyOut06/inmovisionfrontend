import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Visita } from '../../../models/Visita';
import { VisitaService } from '../../../services/visitaservice';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-visitalistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink, A11yModule],
  templateUrl: './visitalistar.html',
  styleUrl: './visitalistar.css',
})
export class Visitalistar implements OnInit {

  dataSource: MatTableDataSource<Visita> = new MatTableDataSource();

  displayedColumns: string[] = [
    'a', // id visita
    'b', // fecha_hora
    'c', // estado
    'd', // usuario
    'e', // propiedad
    'f', // editar
    'g'  // eliminar
  ];

  constructor(private vS: VisitaService) {}

  ngOnInit(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.vS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.vS.delete(id).subscribe(() => {
      this.vS.list().subscribe(data => {
        this.vS.setList(data);
      });
    });
  }

}
