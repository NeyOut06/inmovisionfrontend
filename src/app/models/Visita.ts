import { Propiedad } from "./Propiedad"
import { Usuario } from "./Usuario"


export class Visita{
    idVisita: number=0
    fechaHora: Date=new Date()
    estado: string=""
    usuario: Usuario = new Usuario()
    propiedad: Propiedad = new Propiedad()
}
