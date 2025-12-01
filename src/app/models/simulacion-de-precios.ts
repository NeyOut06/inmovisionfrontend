import { Usuario } from "./Usuario";
import { Propiedad } from "./Propiedad";

export class SimulacionPrecios {
    idSimulacion: number = 0;
    montoInicial: number = 0;
    tasaIntereses: number = 0;
    plazoMeses: number = 0;
    cuotaMensual: number = 0;
    fecha: Date = new Date();
    usuario: Usuario = new Usuario();
    propiedad: Propiedad = new Propiedad();
}