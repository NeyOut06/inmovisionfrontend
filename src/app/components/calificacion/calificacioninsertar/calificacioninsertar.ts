import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Calificacion } from '../../../models/Calificacion';
import { CalificacionService } from '../../../services/calificacionservice';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-calificacion-insertar',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './calificacioninsertar.html',
  styleUrl: './calificacioninsertar.css',
})

export class Calificacioninsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  calificacion: Calificacion = new Calificacion();

  edicion: boolean = false;
  id: number = 0;
  hoy: Date = new Date();
  listaUsuarios: Usuario[] = [];
  listaPropiedades: Propiedad[] = [];

  constructor(
    private cS: CalificacionService,
    private uS: Usuarioservice,
    private pS: Propiedadservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => (this.listaUsuarios = data));
    this.pS.list().subscribe((data) => (this.listaPropiedades = data));

    this.form = this.formBuilder.group({
      codigo: [''],
      puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      fecha: ['', this.hoy, Validators.required],
      usuario: ['', Validators.required],
      propiedad: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.calificacion.idCalificacion = this.form.value.codigo;
      this.calificacion.puntuacion = this.form.value.puntuacion;
      this.calificacion.comentario = this.form.value.comentario;
      this.calificacion.fecha = this.form.value.fecha;

      this.calificacion.usuario.idUser = this.form.value.usuario;
      this.calificacion.propiedad.idPropiedad = this.form.value.propiedad;

      if (this.edicion) {
        this.cS.update(this.calificacion).subscribe(() => {
          this.cS.list().subscribe((data) => this.cS.setList(data));
        });
      } else {
        this.cS.insert(this.calificacion).subscribe(() => {
          this.cS.list().subscribe((data) => this.cS.setList(data));
        });
      }

      this.router.navigate(['calificaciones']);
    }
  }

  cancelar(): void {
    this.router.navigate(['calificaciones']);
  }

  init(): void {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCalificacion),
          puntuacion: new FormControl(data.puntuacion),
          comentario: new FormControl(data.comentario),  
          fecha: new FormControl(data.fecha),
          usuario: new FormControl(data.usuario.idUser),
          propiedad: new FormControl(data.propiedad.idPropiedad),
        });
      });
    }
  }
}
