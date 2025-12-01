import { Propiedad } from './Propiedad';

export class Contrato {
  idContrato: number = 0;
  tipo: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  monto: number = 0;
  estado: string = '';
  terminosYCondiciones: string = '';
  propiedad: Propiedad = new Propiedad();
}
