import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Comparacion } from "../models/Comparacion";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

const base_url=environment.base
@Injectable({
  providedIn: 'root',
})
export class Comparacionservice {
  private url = `${base_url}/comparaciones`;

  private listaCambio = new Subject<Comparacion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comparacion[]>(this.url);
  }

  setList(ListaNueva: Comparacion[]) {
    this.listaCambio.next(ListaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  insert(c: Comparacion) {
    return this.http.post(this.url, c);
  }
   listId(id: number) {
    return this.http.get<Comparacion>(`${this.url}/${id}`);
  }
  update(c: Comparacion) {
    return this.http.put(`${this.url}`, c, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}