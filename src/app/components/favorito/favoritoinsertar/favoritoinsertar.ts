import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Favorito } from '../../../models/Favorito';
import { Favoritoservice } from '../../../services/favoritoservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Propiedadservice } from '../../../services/propiedadservice';
import { Listafavoritoservice } from '../../../services/listafavoritoservice';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/Usuario';
import { Propiedad } from '../../../models/Propiedad';
import { ListaFavorito } from '../../../models/ListaFavorito';

@Component({
  selector: 'app-favoritoinsertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './favoritoinsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './favoritoinsertar.css',
})
export class Favoritoinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  fav: Favorito = new Favorito();
  edicion: boolean = false;
  id: number = 0;
  hoy: Date = new Date();
  listaUsuarios: Usuario[] = [];
  listaPropiedades: Propiedad[] = [];
  listaListasFavoritos: ListaFavorito[] = [];

  constructor(
    private fS: Favoritoservice,
    private uS: Usuarioservice,
    private pS: Propiedadservice,
    private lfS: Listafavoritoservice,
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

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaPropiedades = data;
    });

    this.lfS.list().subscribe((data) => {
      this.listaListasFavoritos = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      fechaAgregado: [this.hoy, Validators.required],
      usuarioFK: ['', Validators.required],
      propiedadFK: ['', Validators.required],
      listaFavoritoFK: ['', Validators.required],
    });
  }
  cancelar() {
    this.router.navigate(['favoritos']);
  }
  aceptar(): void {
    if (this.form.valid) {
      this.fav.idFavorito = this.form.value.id;
      this.fav.fechaAgregado = this.form.value.fechaAgregado;
      this.fav.usuario.idUser = this.form.value.usuarioFK;
      this.fav.propiedad.idPropiedad = this.form.value.propiedadFK;
      this.fav.listaFavoritos.idLista = this.form.value.listaFavoritoFK;

      if (this.edicion) {
        this.fS.update(this.fav).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.fav).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['favoritos']);
    }
  }

  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idFavorito),
          fechaAgregado: new FormControl(data.fechaAgregado),
          usuarioFK: new FormControl(data.usuario.idUser),
          propiedadFK: new FormControl(data.propiedad.idPropiedad),
          listaFavoritoFK: new FormControl(data.listaFavoritos.idLista),
        });
      });
    }
  }
}
