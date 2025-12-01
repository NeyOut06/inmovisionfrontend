import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ListaFavorito } from "../models/ListaFavorito";
import { Subject } from "rxjs";

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class Listafavoritoservice {
    private url = `${base_url}/listasfavoritos`;
    private listaCambio = new Subject<ListaFavorito[]>();
    
    constructor(private http: HttpClient) {}
    
    list() {
        return this.http.get<ListaFavorito[]>(this.url);
    }

    insert(lf: ListaFavorito) {
        return this.http.post(this.url, lf);
    }

    setList(listaNueva: ListaFavorito[]) {
        this.listaCambio.next(listaNueva);
    }
    
    getList() {
        return this.listaCambio.asObservable();
    }
    
    listId(id: number) {
        return this.http.get<ListaFavorito>(`${this.url}/${id}`);
    }
    
    update(lf: ListaFavorito) {
        return this.http.put(this.url, lf, { responseType: 'text' });
    }
    
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }
}