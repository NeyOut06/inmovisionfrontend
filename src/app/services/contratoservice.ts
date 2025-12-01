import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { Observable, Subject } from "rxjs"
import { Contrato } from "../models/contrato"
import { TopDistritoContratosDTO } from "../models/TopDistritoContratosDTO"
import { PromedioMontoPorTipoDTO } from "../models/PromedioMontoPorTipoDTO"

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Contratoservice {
  private url = `${base_url}/contratos`;
  private listaCambio = new Subject<Contrato[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Contrato[]>(this.url)
  }

  insert(c: Contrato) {
    return this.http.post(this.url, c);
  }

  setList(listaNueva: Contrato[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Contrato>(`${this.url}/${id}`);
  }

  update(c: Contrato) {
    return this.http.put(this.url, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getTopdistritosContrato():Observable<TopDistritoContratosDTO[]>{
    return this.http.get<TopDistritoContratosDTO[]>(`${this.url}/top_distritos`)
  }

  getPromedioMontoTipoContrato():Observable<PromedioMontoPorTipoDTO[]>{
    return this.http.get<PromedioMontoPorTipoDTO[]>(`${this.url}/monto_promedio`)
  }
}