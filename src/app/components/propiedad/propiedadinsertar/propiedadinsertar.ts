import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Propiedad } from '../../../models/Propiedad';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Distrito } from '../../../models/Distrito';
import { Distritoservice } from '../../../services/distritoservice';
import { UploadService } from '../../../services/upload-service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-propiedadinsertar',
  imports: [
    MatSlideToggleModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],

  templateUrl: './propiedadinsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './propiedadinsertar.css',
})
export class Propiedadinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  dis: Propiedad = new Propiedad();
  edicion: boolean = false;
  id: number = 0;
  hoy: Date = new Date();
  listaUsuarios: Usuario[] = [];
  listaDistritos: Distrito[] = [];
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  existingImages: any[] = [];

  constructor(
    private dS: Propiedadservice,
    private uS: Usuarioservice,
    private disS: Distritoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

    private uploadService: UploadService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaPublicacion: [this.hoy, Validators.required],
      estado: ['', Validators.required],
      metrosCuadrados: ['', [Validators.required, Validators.min(1)]],
      habitaciones: ['', [Validators.required, Validators.min(0)]],
      banos: ['', [Validators.required, Validators.min(0)]],
      destacada: ['', Validators.required],
      latitud: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      urlVr: ['', Validators.required],
      notas: ['', Validators.required],
      usuario: ['', Validators.required],
      distrito: ['', Validators.required],
      imagenes: [''],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.disS.list().subscribe((data) => {
      this.listaDistritos = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);

    // Previsualización
    this.previewImages = [];
    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImages.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  async aceptar(): Promise<void> {
    if (this.form.valid) {
      let finalImages: any[] = [];

      // SI SUBE NUEVAS IMÁGENES → subirlas al servidor
      if (this.selectedFiles.length > 0) {
        const urls: string[] = await Promise.all(
          this.selectedFiles.map((file) => firstValueFrom(this.uploadService.uploadImage(file)))
        );

        finalImages = urls.map((url) => ({
          urlImagen: url,
          descripcion: 'Imagen subida',
          idPropiedad: this.id,
        }));
      } else {
        // SI NO SUBE NADA → conservar las imágenes existentes
        finalImages = this.existingImages.map((img) => ({
          idImagen: img.idImagen,
          urlImagen: img.urlImagen,
          descripcion: img.descripcion,
          idPropiedad: this.id,
        }));
      }

      this.dis.imagenes = finalImages;
      // 3. Asignar campos del formulario
      this.dis.idPropiedad = this.form.value.codigo;
      this.dis.titulo = this.form.value.titulo;
      this.dis.descripcion = this.form.value.descripcion;
      this.dis.precio = this.form.value.precio;
      this.dis.tipo = this.form.value.tipo;
      this.dis.categoria = this.form.value.categoria;
      this.dis.direccion = this.form.value.direccion;
      this.dis.fechaPublicacion = this.form.value.fechaPublicacion;
      this.dis.estado = this.form.value.estado;
      this.dis.metrosCuadrados = this.form.value.metrosCuadrados;
      this.dis.habitaciones = this.form.value.habitaciones;
      this.dis.banos = this.form.value.banos;
      this.dis.destacada = this.form.value.destacada;
      this.dis.latitud = this.form.value.latitud;
      this.dis.longitud = this.form.value.longitud;
      this.dis.urlVr = this.form.value.urlVr;
      this.dis.notas = this.form.value.notas;
      this.dis.usuario.idUser = this.form.value.usuario;
      this.dis.distrito.idDistrito = this.form.value.distrito;

      if (this.edicion) {
        this.dS.update(this.dis).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
        });
      } else {
        this.dS.insert(this.dis).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
        });
      }

      this.router.navigate(['propiedades']);
    }
  }

  cancelar(): void {
    this.router.navigate(['propiedades']);
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPropiedad),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          precio: new FormControl(data.precio),
          tipo: new FormControl(data.tipo),
          categoria: new FormControl(data.categoria),
          direccion: new FormControl(data.direccion),
          fechaPublicacion: new FormControl(data.fechaPublicacion),
          estado: new FormControl(data.estado),
          metrosCuadrados: new FormControl(data.metrosCuadrados),
          habitaciones: new FormControl(data.habitaciones),
          banos: new FormControl(data.banos),
          destacada: new FormControl(data.destacada),
          latitud: new FormControl(data.latitud),
          longitud: new FormControl(data.longitud),
          urlVr: new FormControl(data.urlVr),
          notas: new FormControl(data.notas),

          usuario: new FormControl(data.usuario.idUser),
          distrito: new FormControl(data.distrito.idDistrito),

          imagenes: new FormControl(data.imagenes),
        });
        this.existingImages = data.imagenes;
        this.previewImages = data.imagenes.map((img: any) => img.urlImagen);
      });
    }
  }
}