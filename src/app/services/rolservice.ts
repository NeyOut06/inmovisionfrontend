import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment"
import { Subject } from "rxjs"
import { Usuario } from '../models/Usuario';
import { Rol } from '../models/Rol';

const base_url=environment.base


@Injectable({
  providedIn: 'root',
})
export class Rolservice {

  private url=  `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor (private http:HttpClient){}

  list(){
    return this.http.get<Rol[]>(this.url)
  }

  insert(r: Rol) {
    return this.http.post(this.url, r);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(r: Rol) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  
}
