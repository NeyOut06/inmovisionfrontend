import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Calificacion } from "../models/Calificacion";

import { Subject, Observable } from "rxjs";  
import { ReporteCalificacionPromedioDTO } from "../models/ReporteCalificacionPromedioDTO";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private url = `${base_url}/calificaciones`;
  private listaCambio = new Subject<Calificacion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Calificacion[]>(this.url);
    
  }

  insert(c: Calificacion) {
    return this.http.post(this.url, c);
  }

  setList(listaNueva: Calificacion[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Calificacion>(`${this.url}/${id}`);
  }

  update(c: Calificacion) {
    return this.http.put(this.url, c, { responseType: "text" });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: "text" });
  }

  getCalificacionPromedio():Observable<ReporteCalificacionPromedioDTO[]>{
    return this.http.get<ReporteCalificacionPromedioDTO[]>(`${this.url}/ReporteCalificacionPromedio`)
  }

}