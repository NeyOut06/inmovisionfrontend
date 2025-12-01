import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { SimulacionPrecios } from "../models/simulacion-de-precios";
import { Subject } from "rxjs";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SimulacionDePreciosService {

  private url = `${base_url}/simulacionprecios`;
  private listaCambio = new Subject<SimulacionPrecios[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<SimulacionPrecios[]>(this.url);
  }

  insert(s: SimulacionPrecios) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: SimulacionPrecios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<SimulacionPrecios>(`${this.url}/${id}`);
  }

  update(s: SimulacionPrecios) {
    return this.http.put(this.url, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}