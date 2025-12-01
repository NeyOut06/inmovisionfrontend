import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuariolistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule,RouterLink],
  templateUrl: './usuariolistar.html',
  styleUrl: './usuariolistar.css',
})
export class Usuariolistar implements OnInit {
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6', 'c7', 'c8'];

  constructor(private dS:Usuarioservice, public route:ActivatedRoute){}

  ngOnInit(): void {
    this.dS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(data=>{
      this.dS.list().subscribe(data=>{
        this.dS.setList(data)
      })
    })
  }
}
