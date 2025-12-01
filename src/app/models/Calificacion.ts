import { Propiedad } from "./Propiedad";
import { Usuario } from "./Usuario";

export class Calificacion{
    idCalificacion: number=0
    puntuacion: number=0
    comentario: string = ''
    fecha: string = ''
    usuario: Usuario = new Usuario()
    propiedad: Propiedad = new Propiedad()
}