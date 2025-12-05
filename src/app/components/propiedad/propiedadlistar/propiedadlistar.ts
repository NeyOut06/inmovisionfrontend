import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-propiedadlistar',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './propiedadlistar.html',
  styleUrls: ['./propiedadlistar.css'],
})
export class Propiedadlistar implements OnInit {
  dataSource: MatTableDataSource<Propiedad> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11',
    'c12','c13','c14','c15','c16','c17','c18','c19','c20','c21','c22'
  ];

  // Propiedad seleccionada para ver detalles
  selectedPropiedad: Propiedad | null = null;

  constructor(
    private dS: Propiedadservice,
    private router: Router,
    public route: ActivatedRoute,
    public loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }

  verUbicacion(idPropiedad: number) {
    this.router.navigate(['/propiedades', idPropiedad, 'mapa']);
  }

  verDetalles(propiedad: Propiedad) {
    this.selectedPropiedad = propiedad;
  }

  cerrarDetalles() {
    this.selectedPropiedad = null;
  }
}
