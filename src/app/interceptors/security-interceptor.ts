// security-interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private snack: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token JWT desde sessionStorage
    const token = sessionStorage.getItem('token');
    
    // Si hay un token, agrega el encabezado Authorization con el prefijo Bearer
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Agregar "Bearer" antes del token
        }
      });

      return next.handle(clonedRequest); // Pasar la solicitud clonada con el token
    }

    // Si no hay token, simplemente pasa la solicitud sin modificarla
    return next.handle(req);
  }
}
