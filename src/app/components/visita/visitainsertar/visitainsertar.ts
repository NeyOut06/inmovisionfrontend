import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Visita } from '../../../models/Visita';
import { VisitaService } from '../../../services/visitaservice';

import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-visitainsertar',

  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './visitainsertar.html',
  styleUrl: './visitainsertar.css',
})
export class Visitainsertar implements OnInit {
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  visita: Visita = new Visita();
  listaUsuarios: Usuario[] = [];
  listaPropiedades: Propiedad[] = [];

  constructor(
    private vS: VisitaService,
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

    this.pS.list().subscribe((data: Propiedad[]) => {
      this.listaPropiedades = data;
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    this.form = this.formBuilder.group({
      codigo: [''],
      fechaHora: ['', [Validators.required, this.validarFechaFutura(hoy)]],
      estado: ['', Validators.required],
      usuario: ['', Validators.required],
      propiedad: ['', Validators.required],
    });
  }

  validarFechaFutura(minDate: Date) {
    return (control: FormControl) => {
      const value = control.value;

      if (!value) return null;

      const fechaSeleccionada = new Date(value);
      fechaSeleccionada.setHours(0, 0, 0, 0);

      return fechaSeleccionada >= minDate
        ? null
        : { fechaInvalida: true };
    };
  }

  cancelar(): void {
    this.router.navigate(['visitas']);
  }
  aceptar(): void {
    if (this.form.valid) {
      this.visita.idVisita = this.form.value.codigo;
      this.visita.fechaHora = this.form.value.fechaHora;
      this.visita.estado = this.form.value.estado;
      this.visita.usuario.idUser = this.form.value.usuario;
      this.visita.propiedad.idPropiedad = this.form.value.propiedad;

      if (this.edicion) {
        this.vS.update(this.visita).subscribe(() => {
          this.vS.list().subscribe((data) => this.vS.setList(data));
        });
      } else {
        this.vS.insert(this.visita).subscribe(() => {
          this.vS.list().subscribe((data) => this.vS.setList(data));
        });
      }

      this.router.navigate(['visitas']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idVisita),
          fechaHora: new FormControl(data.fechaHora),
          estado: new FormControl(data.estado),
          usuario: new FormControl(data.usuario.idUser),
          propiedad: new FormControl(data.propiedad.idPropiedad),
        });
      });
    }
  }
}
