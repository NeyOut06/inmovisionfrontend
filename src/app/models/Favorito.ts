import { Usuario } from "./Usuario"
import { Propiedad } from "./Propiedad"
import { ListaFavorito } from "./ListaFavorito"

export class Favorito {
    idFavorito: number = 0
    fechaAgregado: Date = new Date()
    usuario: Usuario = new Usuario()
    propiedad: Propiedad = new Propiedad()
    listaFavoritos: ListaFavorito = new ListaFavorito()
}