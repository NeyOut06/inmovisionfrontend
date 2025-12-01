import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { Pago } from '../../../models/pago';
import { Pagoservice } from '../../../services/pagoservice';
import { Contrato } from '../../../models/contrato';
import { Contratoservice } from '../../../services/contratoservice';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-pagoinsertar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './pagoinsertar.html',
  styleUrl: './pagoinsertar.css',
})
export class Pagoinsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  hoy: Date = new Date();
  pago: Pago = new Pago();

  listaContratos: Contrato[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private pS: Pagoservice,
    private cS: Contratoservice,
    private uS: Usuarioservice,
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

    // Llenar listas
    this.cS.list().subscribe((data) => (this.listaContratos = data));
    this.uS.list().subscribe((data) => (this.listaUsuarios = data));

    this.form = this.formBuilder.group({
      codigo: [''],
      monto: ['', [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      fecha: [this.hoy, Validators.required],
      metodo: ['', Validators.required],
      contrato: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pago.idPago = this.form.value.codigo;
      this.pago.monto = this.form.value.monto;
      this.pago.fechaPago = this.form.value.fecha;
      this.pago.metodoPago = this.form.value.metodo;

      // estado opcional
      this.pago.estado = this.pago.estado || 'PENDIENTE';

      // mapear contrato (solo idContrato)
      this.pago.contrato.idContrato = this.form.value.contrato;

      // mapear usuario (solo idUser) -> evita id_usuario = 0
      this.pago.usuario.idUser = this.form.value.usuario;

      if (this.edicion) {
        this.pS.update(this.pago).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.pago).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }

      this.router.navigate(['pagos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['pagos']);
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.pago = data;

        this.form = new FormGroup({
          codigo: new FormControl(data.idPago),
          monto: new FormControl(data.monto),
          fecha: new FormControl(data.fechaPago),
          metodo: new FormControl(data.metodoPago),
          contrato: new FormControl(data.contrato.idContrato),
          usuario: new FormControl(data.usuario.idUser),
        });
      });
    }
  }
}
