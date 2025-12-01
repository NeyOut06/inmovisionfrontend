import { Propiedad } from "./Propiedad"
import { Usuario } from "./Usuario"

export class Mensaje{
    idMensaje?: number;
    contenido: string=""
    enviadoEn: Date=new Date() 
    usuario: Usuario = new Usuario()
    propiedad: Propiedad = new Propiedad()
}