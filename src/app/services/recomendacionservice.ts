import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Recomendacion } from '../models/Recomendacion';
import { HttpClient } from '@angular/common/http';
import { ReporteRecomendacionesPorPropiedadDTO } from '../models/ReporteRecomendacionesPorPropiedadDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Recomendacionservice {
  private url = `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendacion[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Recomendacion[]>(this.url);
  }

  setList(ListaNueva: Recomendacion[]) {
    this.listaCambio.next(ListaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  insert(re: Recomendacion) {
    return this.http.post(this.url, re);
  }
  listId(id: number) {
    return this.http.get<Recomendacion>(`${this.url}/${id}`);
  }
  update(re: Recomendacion) {
    return this.http.put(`${this.url}`, re, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getReporteRecomendacionesPorPropiedad() {
    return this.http.get<ReporteRecomendacionesPorPropiedadDTO[]>(
      `${this.url}/reporte/por-propiedad`
    );
  }
}
