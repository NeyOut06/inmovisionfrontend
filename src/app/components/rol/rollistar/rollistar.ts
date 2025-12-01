import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rollistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule,RouterLink, CommonModule],
  templateUrl: './rollistar.html',
  styleUrl: './rollistar.css',
})
export class Rollistar implements OnInit {

  dataSource:MatTableDataSource<Rol>=new MatTableDataSource
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  

  constructor(private rS:Rolservice, public route:ActivatedRoute){}

  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    })
  }

}
