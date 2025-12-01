import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { Pago } from "../models/pago"
import { Observable, Subject } from "rxjs"
import { PagoXUsuarioDTO } from "../models/PagoXUsuarioDTO"
import { ReportePagosPorMetodoDTO } from "../models/ReportePagosPorMetodoDTO"

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Pagoservice {
  private url = `${base_url}/pagos`;
  private listaCambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Pago[]>(this.url)
  }

  insert(p: Pago) {
    return this.http.post(this.url, p);
  }

  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`);
  }

  update(p: Pago) {
    return this.http.put(this.url, p, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getPagosPorUsuario(
    inicio?: string,
    fin?: string
  ): Observable<PagoXUsuarioDTO[]> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio);
    if (fin)    params = params.set('fin', fin);

    return this.http.get<PagoXUsuarioDTO[]>(
      `${this.url}/por-usuario`,
      { params }
    );
  }

  // 🔹 NUEVO: Reporte pagos por método (sin filtros)
  getReportePagosPorMetodo(): Observable<ReportePagosPorMetodoDTO[]> {
    return this.http.get<ReportePagosPorMetodoDTO[]>(
      `${this.url}/ReportePagosPorMetodo`
    );
  }
}