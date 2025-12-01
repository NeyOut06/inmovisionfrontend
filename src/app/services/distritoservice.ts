import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { Distrito } from "../models/Distrito"
import { Subject } from "rxjs"

const base_url=environment.base

@Injectable({
  providedIn: 'root',
})
export class Distritoservice {
  private url= `${base_url}/distritos`;
  private listaCambio = new Subject<Distrito[]>();
  constructor (private http:HttpClient){}

  list(){
    return this.http.get<Distrito[]>(this.url)
  }

  insert(d: Distrito) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Distrito[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Distrito>(`${this.url}/${id}`);
  }

  update(d: Distrito) {
    return this.http.put(this.url, d, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
