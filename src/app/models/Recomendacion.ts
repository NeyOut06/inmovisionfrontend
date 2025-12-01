import { Propiedad } from "./Propiedad"
import { Usuario } from "./Usuario"

export class Recomendacion{
    idRecomendacion?: number
    motivo: string = ""
    fecha: Date = new Date()
    usuario: Usuario = new Usuario()
    propiedad: Propiedad = new Propiedad()
}