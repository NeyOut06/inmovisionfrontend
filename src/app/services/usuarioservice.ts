import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment"
import { Subject } from "rxjs"
import { Usuario } from '../models/Usuario';

const base_url=environment.base

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {

  private url=  `${base_url}/usuario`;
  private listaCambio = new Subject<Usuario[]>();
  constructor (private http:HttpClient){}

  list(){
    return this.http.get<Usuario[]>(this.url)
  }

  insert(u: Usuario) {
    return this.http.post(this.url, u);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(this.url, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  
  
}
