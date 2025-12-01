import { Rol } from './Rol';

export class Usuario {
  idUser: number=0
  nombre: string = ""
  apellido: string = ""
  correo: string = ""
  username: string = ""
  password: string = ""
  telefono: string = ""
  fotourl: string = ""
  fecha_registro: string = "" 
  enabled: boolean = true
  roles: Rol[] = []
}
