import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListaFavorito } from '../../../models/ListaFavorito';
import { Listafavoritoservice } from '../../../services/listafavoritoservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-favoritosinsertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './lista_favoritosinsertar.html',
  styleUrl: './lista_favoritosinsertar.css',
})
export class Lista_favoritosinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  listaFav: ListaFavorito = new ListaFavorito();
  edicion: boolean = false;
  id: number = 0;

  constructor(
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

    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['',[Validators.maxLength(200)]],
    });
  }

  cancelar() {
    this.router.navigate(['listas-favoritos']);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.listaFav.idLista = this.form.value.id;
      this.listaFav.nombre = this.form.value.nombre;
      this.listaFav.descripcion = this.form.value.descripcion;

      if (this.edicion) {
        this.lfS.update(this.listaFav).subscribe(() => {
          this.lfS.list().subscribe((data) => {
            this.lfS.setList(data);
          });
        });
      } else {
        this.lfS.insert(this.listaFav).subscribe(() => {
          this.lfS.list().subscribe((data) => {
            this.lfS.setList(data);
          });
        });
      }
      this.router.navigate(['listas-favoritos']);
    }
  }

  init() {
    if (this.edicion) {
      this.lfS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idLista),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
  }
}