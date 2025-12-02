import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SecurityInterceptor } from './interceptors/security-interceptor';
export function tokenGetter() {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.sessionStorage.getItem('token');
  return token && token.split('.').length === 3 ? token : null;
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
       importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://inmovision.onrender.com'],
          disallowedRoutes: ['https://inmovision.onrender.com/login/forget'],
        },
      })
    ),
    { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true,} // Agregar esta línea },
  ]
};
