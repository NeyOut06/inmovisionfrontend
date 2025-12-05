import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,   // ⬅️ agrega esto
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';   // ⬅️ y esto
import { catchError } from 'rxjs/operators';     // ⬅️ y esto
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private snack: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    
    const clonedRequest = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    // ⬇️ ESTA ES LA LÍNEA/ BLOQUE QUE AGREGA EL MENSAJE
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.snack.open('⛔ Tu rol no tiene autorización para esta acción', 'Cerrar', {
            duration: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }
}
