import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Recomendacion } from '../../../models/Recomendacion';
import { Recomendacionservice } from '../../../services/recomendacionservice';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/Usuario';
import { Propiedad } from '../../../models/Propiedad';

@Component({
  selector: 'app-recomendacioninsertar',
  imports: [MatSelectModule, MatInputModule, MatRadioModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, MatNativeDateModule, MatIconModule,],
  templateUrl: './recomendacioninsertar.html',
  styleUrl: './recomendacioninsertar.css',
})
export class Recomendacioninsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  rec: Recomendacion = new Recomendacion();
  hoy: Date = new Date();
  listaUsuarios: Usuario[]=[];
  listaPropiedades: Propiedad[]=[];


  constructor(
    private rS: Recomendacionservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private pS: Propiedadservice, 
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data ['id']!=null;
      this.init();
    });

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    });

    this.pS.list().subscribe(data=>{
      this.listaPropiedades=data
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      fecha: [this.hoy, Validators.required],
      usuarioFK: ['', Validators.required],
      propiedadFK: ['', Validators.required],
    });
  }
cancelar(): void {
    this.router.navigate(['recomendaciones']);
  }
  aceptar(): void {
    if(this.form.valid) {
      this.rec.idRecomendacion = this.form.value.codigo;
      this.rec.motivo = this.form.value.motivo;
      this.rec.fecha = this.form.value.fecha;
      this.rec.usuario.idUser = this.form.value.usuarioFK;
      this.rec.propiedad.idPropiedad = this.form.value.propiedadFK;
    
      if(this.edicion){
        this.rS.update(this.rec).subscribe(()=>{
          this.rS.list().subscribe((data) =>{
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rec).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['recomendaciones']);
    }
  }

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecomendacion),
          motivo: new FormControl(data.motivo),
          fecha: new FormControl(data.fecha),
          usuarioFK: new FormControl(data.usuario.idUser),
          propiedadFK: new FormControl(data.propiedad.idPropiedad)
        });
      });
    }
  }
}
