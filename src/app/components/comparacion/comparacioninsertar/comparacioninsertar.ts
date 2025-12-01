import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Comparacion } from '../../../models/Comparacion';
import { Propiedad } from '../../../models/Propiedad';
import { Comparacionservice } from '../../../services/comparacionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-comparacioninsertar',
  imports: [MatSelectModule,MatInputModule,MatRadioModule,MatDatepickerModule,MatButtonModule,ReactiveFormsModule,MatNativeDateModule,MatIconModule],
  templateUrl: './comparacioninsertar.html',
  styleUrl: './comparacioninsertar.css',
})
export class Comparacioninsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  comp: Comparacion = new Comparacion();

  listaUsuarios: Usuario[] = [];
  listaPropiedades: Propiedad[] = [];

  constructor(
    private cS: Comparacionservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private pS: Propiedadservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // cargar usuarios
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    // cargar propiedades
    this.pS.list().subscribe((data) => {
      this.listaPropiedades = data;
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      propiedad1: ['', Validators.required],
      propiedad2: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comp.idComparacion = this.form.value.codigo;
      this.comp.usuario.idUser = this.form.value.usuario;
      this.comp.propiedad1.idPropiedad = this.form.value.propiedad1;
      this.comp.propiedad2.idPropiedad = this.form.value.propiedad2;

      if (this.edicion) {
        this.cS.update(this.comp).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comp).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }

      this.router.navigate(['comparaciones']);
    }
  }

  cancelar(): void {
    this.router.navigate(['comparaciones']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idComparacion),
          usuario: new FormControl(data.usuario.idUser),
          propiedad1: new FormControl(data.propiedad1.idPropiedad),
          propiedad2: new FormControl(data.propiedad2.idPropiedad),
        });
      });
    }
  }
}

