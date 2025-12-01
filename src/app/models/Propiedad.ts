import { Usuario } from './Usuario';
import { Distrito } from './Distrito';
import { ImagenPropiedad } from './ImagenPropiedad';

export class Propiedad {

  idPropiedad: number = 0;
  titulo: string = '';
  descripcion: string = '';
  precio: number = 0;
  tipo: string = '';
  categoria: string = '';
  direccion: string = '';
  fechaPublicacion: string = ''; // LocalDate → string en Angular
  estado: string = '';
  metrosCuadrados: number = 0;
  habitaciones: number = 0;
  banos: number = 0;
  destacada: boolean = false;
  latitud: number = 0;
  longitud: number = 0;
  urlVr: string = '';
  notas: string = '';

  usuario: Usuario = new Usuario();
  distrito: Distrito = new Distrito();
  imagenes: ImagenPropiedad[] = [];
}