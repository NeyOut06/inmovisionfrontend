import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Favorito } from '../models/Favorito';
import { Observable, Subject } from 'rxjs';
import { ReporteFavoritosPorPropiedadDTO } from '../models/ReporteFavoritosPorPropiedadDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Favoritoservice {
  private url = `${base_url}/favoritos`;
  private listaCambio = new Subject<Favorito[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Favorito[]>(this.url);
  }

  insert(f: Favorito) {
    return this.http.post(this.url, f);
  }

  setList(listaNueva: Favorito[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Favorito>(`${this.url}/${id}`);
  }

  update(f: Favorito) {
    return this.http.put(this.url, f, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getReporteFavoritosPorPropiedad(): Observable<ReporteFavoritosPorPropiedadDTO[]> {
    return this.http.get<ReporteFavoritosPorPropiedadDTO[]>(
      `${this.url}/ReporteFavoritosPorPropiedad`
    );
  }
}
