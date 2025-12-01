// src/app/components/mensaje/mensajeinsertar/mensajeinsertar.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Mensaje } from '../../../models/Mensaje';
import { MensajeService } from '../../../services/mensajeservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Propiedad } from '../../../models/Propiedad';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-mensaje-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './mensajeinsertar.html',
  styleUrl: './mensajeinsertar.css',
})
export class Mensajeinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  idPropiedad: number = 0;

  // 🔹 Lista y usuario seleccionado desde el combo
  listaUsuarios: Usuario[] = [];
  usuarioSeleccionadoId: number | null = null;

  propiedad: Propiedad = new Propiedad();
  mensajes: Mensaje[] = [];

  constructor(
    private mS: MensajeService,
    private uS: Usuarioservice,
    private pS: Propiedadservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1) Form con usuario + contenido
    this.form = this.formBuilder.group({
      usuarioId: [null, Validators.required],
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
    });

    // Para poder saber cuál es el usuario “actual” del combo (para colorear mis mensajes)
    this.form.get('usuarioId')?.valueChanges.subscribe((id) => {
      this.usuarioSeleccionadoId = id;
    });

    // 2) ID de propiedad por query param
    this.route.queryParams.subscribe((params: Params) => {
      this.idPropiedad = +(params['propiedadId'] || 0);
      if (this.idPropiedad) {
        this.cargarDatos();
      }
    });

    // 3) Cargar usuarios para el combo
    this.uS.list().subscribe({
      next: (usuarios) => {
        this.listaUsuarios = usuarios;
      },
      error: (err) => console.error('Error cargando usuarios', err),
    });
  }

  cargarDatos(): void {
    // Propiedad
    this.pS.listId(this.idPropiedad).subscribe((data) => {
      this.propiedad = data;
    });

    // Mensajes de esa propiedad
    this.mS.list().subscribe((data) => {
      this.mensajes = data
        .filter((m) => m.propiedad.idPropiedad === this.idPropiedad)
        .sort((a, b) => new Date(a.enviadoEn).getTime() - new Date(b.enviadoEn).getTime());
    });
  }

  enviarMensaje(): void {
    if (this.form.invalid || !this.idPropiedad) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioId = this.form.value.usuarioId as number;

    const nuevo = new Mensaje();
    nuevo.contenido = this.form.value.contenido;
    nuevo.enviadoEn = new Date();
    nuevo.usuario.idUser = usuarioId;
    nuevo.propiedad.idPropiedad = this.idPropiedad;

    this.mS.insert(nuevo).subscribe(() => {
      // limpiamos solo el contenido, dejamos el usuario seleccionado
      this.form.patchValue({ contenido: '' });
      this.cargarDatos();
    });
  }

  volver(): void {
    this.router.navigate(['mensajes']);
  }

  // “Mis mensajes” = los que coinciden con el usuario elegido en el combo
  esMiMensaje(mensaje: Mensaje): boolean {
    return !!this.usuarioSeleccionadoId && mensaje.usuario?.idUser === this.usuarioSeleccionadoId;
  }

  formatearFecha(fecha: Date): string {
    const f = new Date(fecha);
    const hoy = new Date();

    if (f.toDateString() === hoy.toDateString()) {
      return f.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return f.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Eliminar este mensaje?')) {
      this.mS.delete(id).subscribe(() => this.cargarDatos());
    }
  }
}
