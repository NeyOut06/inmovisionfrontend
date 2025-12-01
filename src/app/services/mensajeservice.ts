import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Mensaje } from "../models/Mensaje";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MensajeXUsuarioDTO } from "../models/MensajeXUsuarioDTO";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private url = `${base_url}/mensajes`;
  private listaCambio = new Subject<Mensaje[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Mensaje[]>(this.url);
  }

  insert(m: Mensaje) {
    return this.http.post(this.url, m);
  }

  setList(listaNueva: Mensaje[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Mensaje>(`${this.url}/${id}`);
  }

  update(m: Mensaje) {
    return this.http.put(this.url, m, { responseType: "text" });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: "text" });
  }

  getMensajesPorUsuario(
    inicio?: string,
    fin?: string
  ): Observable<MensajeXUsuarioDTO[]> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio);
    if (fin)    params = params.set('fin', fin);

    return this.http.get<MensajeXUsuarioDTO[]>(`${this.url}/por-usuario`, {
      params,
    });
  }
}

