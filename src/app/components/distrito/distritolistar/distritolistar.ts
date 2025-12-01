import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Distritoservice } from '../../../services/distritoservice';
import { Distrito } from '../../../models/Distrito';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-distritolistar',
  imports: [MatTableModule, MatIconModule,MatButtonModule, RouterLink],
  templateUrl: './distritolistar.html',
  styleUrl: './distritolistar.css',
})
export class Distritolistar implements OnInit{
  dataSource:MatTableDataSource<Distrito>=new MatTableDataSource
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];
  

  constructor(private dS:Distritoservice, public route:ActivatedRoute){}

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
