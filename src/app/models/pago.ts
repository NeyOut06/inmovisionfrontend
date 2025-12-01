import { Contrato } from "./contrato";
import { Usuario } from "./Usuario";

export class Pago {
    idPago: number = 0;
    fechaPago: Date = new Date();
    monto: number = 0;
    metodoPago: string = "";
    estado: string = "";
    contrato: Contrato = new Contrato();
    usuario: Usuario = new Usuario();
}