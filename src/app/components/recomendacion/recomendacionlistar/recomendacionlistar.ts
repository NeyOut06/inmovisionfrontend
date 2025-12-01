import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recomendacion } from '../../../models/Recomendacion';
import { Recomendacionservice } from '../../../services/recomendacionservice';

@Component({
  selector: 'app-recomendacionlistar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './recomendacionlistar.html',
  styleUrl: './recomendacionlistar.css',
})
export class RecomendacionListar implements OnInit {
  dataSource: MatTableDataSource<Recomendacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  
  constructor(private rS: Recomendacionservice){}
  
  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource =new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data=>{
      this.dataSource =new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    this.rS.delete(id).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    })
  }
}

