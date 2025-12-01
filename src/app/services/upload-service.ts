import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  private url = `${base_url}/upload`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(this.url + "/imagen", formData, {
      responseType: 'text'
    });
  }

}
