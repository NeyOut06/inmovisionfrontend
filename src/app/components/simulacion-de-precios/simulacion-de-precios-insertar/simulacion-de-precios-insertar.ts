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

import { SimulacionPrecios } from '../../../models/simulacion-de-precios';
import { SimulacionDePreciosService } from '../../../services/simulacion-de-precios';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Propiedad } from '../../../models/Propiedad';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-simulacioninsertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './simulacion-de-precios-insertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './simulacion-de-precios-insertar.css',

})
export class Simulacioninsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  hoy: Date = new Date();
  sim: SimulacionPrecios = new SimulacionPrecios();

  listaUsuarios: Usuario[] = [];
  listaPropiedades: Propiedad[] = [];

  constructor(
    private sS: SimulacionDePreciosService,
    private uS: Usuarioservice,
    private pS: Propiedadservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
      usuario: ['', Validators.required],
      propiedad: ['', Validators.required],
      montoInicial: ['', [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      tasaIntereses: ['', [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      plazoMeses: ['', [
          Validators.required,
          Validators.min(1),
          Validators.max(480),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      cuotaMensual: ['', [
          Validators.required,
          Validators.min(100),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      fecha: [this.hoy, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.sim.idSimulacion = this.form.value.codigo;
      this.sim.montoInicial = this.form.value.montoInicial;
      this.sim.tasaIntereses = this.form.value.tasaIntereses;
      this.sim.plazoMeses = this.form.value.plazoMeses;
      this.sim.cuotaMensual = this.form.value.cuotaMensual;
      this.sim.fecha = this.form.value.fecha;

      // FK usuario
      this.sim.usuario.idUser = this.form.value.usuario;
      // FK propiedad
      this.sim.propiedad.idPropiedad = this.form.value.propiedad;

      if (this.edicion) {
        this.sS.update(this.sim).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.sim).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }

      this.router.navigate(['simulacion-de-precios']);
    }
  }

  cancelar(): void {
    this.router.navigate(['simulacion-de-precios']);
  }

  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.sim = data;

        this.form = new FormGroup({
          codigo: new FormControl(data.idSimulacion),
          usuario: new FormControl(data.usuario.idUser),
          propiedad: new FormControl(data.propiedad.idPropiedad),
          montoInicial: new FormControl(data.montoInicial),
          tasaIntereses: new FormControl(data.tasaIntereses),
          plazoMeses: new FormControl(data.plazoMeses),
          cuotaMensual: new FormControl(data.cuotaMensual),
          fecha: new FormControl(data.fecha),
        });
      });
    }
  }
}