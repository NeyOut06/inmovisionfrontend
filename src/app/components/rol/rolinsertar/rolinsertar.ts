import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-rolinsertar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule],
  templateUrl: './rolinsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './rolinsertar.css',
})
export class Rolinsertar implements OnInit{
  form: FormGroup = new FormGroup({});
    dis: Rol = new Rol();
    edicion: boolean = false;
    id: number = 0;
    listaUsuarios: Usuario[] = [];
    listaRoles = ['ADMIN', 'PROPIETARIO', 'CLIENTE'];

  constructor(
      private rS: Rolservice,
      private uS: Usuarioservice,
      private router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute
     
    ) {}

    ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();

    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
    this.listaUsuarios = data;
});
  }
  aceptar(): void {
    if(this.form.valid){  
      this.dis.idRol = this.form.value.codigo;
      this.dis.nombre=this.form.value.nombre
      this.dis.usuario.idUser=this.form.value.usuario
      if (this.edicion) {
        this.rS.update(this.dis).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      else{
        this.rS.insert(this.dis).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
        })
      })}
      this.router.navigate(['roles'])
    }

  }


  cancelar(): void {
  this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nombre: new FormControl(data.nombre),
          usuario: new FormControl(data.usuario.idUser),
          
        });
      });
    }
  }
}
