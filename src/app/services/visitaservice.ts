import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Visita } from '../models/Visita';
import { Subject } from 'rxjs';
import { ReporteVisitasPorPropiedadDTO } from '../models/ReporteVisitasPorPropiedadDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  private url = `${base_url}/visitas`;
  private listaCambio = new Subject<Visita[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Visita[]>(this.url);
  }

  setList(listaNueva: Visita[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  insert(v: Visita) {
    return this.http.post(this.url, v);
  }

  listId(id: number) {
    return this.http.get<Visita>(`${this.url}/${id}`);
  }

  update(v: Visita) {
    return this.http.put(this.url, v, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getReporteVisitasPorPropiedad() {
    return this.http.get<ReporteVisitasPorPropiedadDTO[]>(`${this.url}/reportepor-propiedad`);
  }
}
