import { Routes } from '@angular/router';

import { Distrito } from './components/distrito/distrito';
import { Distritoinsertar } from './components/distrito/distritoinsertar/distritoinsertar';

import { Usuario } from './components/usuario/usuario';
import { Usuarioinsertar } from './components/usuario/usuarioinsertar/usuarioinsertar';

import { Rol } from './components/rol/rol';
import { Rolinsertar } from './components/rol/rolinsertar/rolinsertar';

import { Propiedad } from './components/propiedad/propiedad';
import { Propiedadinsertar } from './components/propiedad/propiedadinsertar/propiedadinsertar';

import { Recomendacion } from './components/recomendacion/recomendacion';
import { Recomendacioninsertar } from './components/recomendacion/recomendacioninsertar/recomendacioninsertar';

import { Comparacion } from './components/comparacion/comparacion';
import { Comparacioninsertar } from './components/comparacion/comparacioninsertar/comparacioninsertar';

import { Mensaje } from './components/mensaje/mensaje';
import { Mensajeinsertar } from './components/mensaje/mensajeinsertar/mensajeinsertar';

import { Visita } from './components/visita/visita';
import { Visitainsertar } from './components/visita/visitainsertar/visitainsertar';

import { Calificacion } from './components/calificacion/calificacion';
import { Calificacioninsertar } from './components/calificacion/calificacioninsertar/calificacioninsertar';

import { Favorito } from './components/favorito/favorito';
import { Favoritoinsertar } from './components/favorito/favoritoinsertar/favoritoinsertar';

import { Lista_favoritos } from './components/lista_favoritos/lista_favoritos';
import { Lista_favoritosinsertar } from './components/lista_favoritos/lista_favoritosinsertar/lista_favoritosinsertar';

import { Pago } from './components/pago/pago';
import { Pagoinsertar } from './components/pago/pagoinsertar/pagoinsertar';

import { Contrato } from './components/contrato/contrato';
import { Contratoinsertar } from './components/contrato/contratoinsertar/contratoinsertar';

import { SimulacionDePrecios } from './components/simulacion-de-precios/simulacion-de-precios';
import { Simulacioninsertar } from './components/simulacion-de-precios/simulacion-de-precios-insertar/simulacion-de-precios-insertar';

import { MapapropiedadComponent } from './components/mapapropiedad/mapapropiedad';

import { Autenticador } from './components/autenticador/autenticador';
import { seguridadGuard } from './guard/seguridad-guard';
import { Home } from './components/home/home';

import { Reportecalificacion } from './components/reportecalificacion/reportecalificacion';
import { Reportetopdistritos } from './components/reportetopdistritos/reportetopdistritos';
import { Reportemontopromediotipo } from './components/reportemontopromediotipo/reportemontopromediotipo';
import { Reportefavoritospropiedad } from './components/reportefavoritospropiedad/reportefavoritospropiedad';
import { Reportemensajesusuario } from './components/reportemensajesusuario/reportemensajesusuario';
import { Reportepagosusuario } from './components/reportepagosusuario/reportepagosusuario';
import { Reportepagosmetodo } from './components/reportepagosmetodo/reportepagosmetodo';
import { Reportepropiedadesdistrito } from './components/reportepropiedadesdistrito/reportepropiedadesdistrito';
import { Reporterecomendacionespropiedad } from './components/reporterecomendacionespropiedad/reporterecomendacionespropiedad';
import { Reportevistaspropiedad } from './components/reportevistaspropiedad/reportevistaspropiedad';

import { Menu } from './components/menu/menu';

export const routes: Routes = [
  // Redirección inicial
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // LOGIN (sin menú)
  {
    path: 'login',
    component: Autenticador,
  },

  // REGISTRO PÚBLICO (si quieres usarlo desde el login)
  {
    path: 'registro',
    component: Usuarioinsertar,
  },

  // TODO LO PROTEGIDO VA BAJO EL LAYOUT Menu
  {
    path: '',
    component: Menu,
    canActivate: [seguridadGuard],
    children: [
      // HOME
      {
        path: 'homes',
        component: Home,
      },

      // DISTRITOS
      {
        path: 'distritos',
        component: Distrito,
        children: [
          { path: 'nuevo', component: Distritoinsertar },
          { path: 'edits/:id', component: Distritoinsertar },
        ],
      },

      // USUARIOS (mantenimiento interno, distinto del registro público)
      {
        path: 'usuarios',
        component: Usuario,
        children: [
          { path: 'nuevo', component: Usuarioinsertar },
          { path: 'edits/:id', component: Usuarioinsertar },
        ],
      },

      // ROLES
      {
        path: 'roles',
        component: Rol,
        children: [
          { path: 'nuevo', component: Rolinsertar },
          { path: 'edits/:id', component: Rolinsertar },
        ],
      },

      // PROPIEDADES
      {
        path: 'propiedades',
        component: Propiedad,
        children: [
          { path: 'nuevo', component: Propiedadinsertar },
          { path: 'edits/:id', component: Propiedadinsertar },
          { path: ':id/mapa', component: MapapropiedadComponent },
        ],
      },

      // MENSAJES
      {
        path: 'mensajes',
        component: Mensaje,
        children: [
          { path: 'nuevo', component: Mensajeinsertar },
          { path: 'edits/:id', component: Mensajeinsertar },
        ],
      },

      // VISITAS
      {
        path: 'visitas',
        component: Visita,
        children: [
          { path: 'nuevo', component: Visitainsertar },
          { path: 'edits/:id', component: Visitainsertar },
        ],
      },

      // CALIFICACIONES
      {
        path: 'calificaciones',
        component: Calificacion,
        children: [
          { path: 'nuevo', component: Calificacioninsertar },
          { path: 'edits/:id', component: Calificacioninsertar },
        ],
      },

      // RECOMENDACIONES
      {
        path: 'recomendaciones',
        component: Recomendacion,
        children: [
          { path: 'nuevo', component: Recomendacioninsertar },
          { path: 'edits/:id', component: Recomendacioninsertar },
        ],
      },

      // COMPARACIONES
      {
        path: 'comparaciones',
        component: Comparacion,
        children: [
          { path: 'nuevo', component: Comparacioninsertar },
          { path: 'edits/:id', component: Comparacioninsertar },
        ],
      },

      // FAVORITOS
      {
        path: 'favoritos',
        component: Favorito,
        children: [
          { path: 'nuevo', component: Favoritoinsertar },
          { path: 'edit/:id', component: Favoritoinsertar },
        ],
      },

      // LISTA FAVORITOS
      {
        path: 'listas-favoritos',
        component: Lista_favoritos,
        children: [
          { path: 'nuevo', component: Lista_favoritosinsertar },
          { path: 'edit/:id', component: Lista_favoritosinsertar },
        ],
      },

      // PAGOS
      {
        path: 'pagos',
        component: Pago,
        children: [
          { path: 'nuevo', component: Pagoinsertar },
          { path: 'edits/:id', component: Pagoinsertar },
        ],
      },

      // CONTRATOS
      {
        path: 'contratos',
        component: Contrato,
        children: [
          { path: 'nuevo', component: Contratoinsertar },
          { path: 'edits/:id', component: Contratoinsertar },
        ],
      },

      // SIMULACIÓN DE PRECIOS
      {
        path: 'simulacion-de-precios',
        component: SimulacionDePrecios,
        children: [
          { path: 'nuevo', component: Simulacioninsertar },
          { path: 'edits/:id', component: Simulacioninsertar },
        ],
      },

      // REPORTES
      { path: 'reportecalificaciones', component: Reportecalificacion },
      { path: 'reportetopdistritos', component: Reportetopdistritos },
      { path: 'reportemontopromediotipo', component: Reportemontopromediotipo },
      { path: 'reporte-favoritos-propiedad', component: Reportefavoritospropiedad },
      { path: 'reportemensajesusuario', component: Reportemensajesusuario },
      { path: 'reportepagosusuario', component: Reportepagosusuario },
      { path: 'reportepagosmetodo', component: Reportepagosmetodo },
      { path: 'reportepropiedadesdistrito', component: Reportepropiedadesdistrito },
      { path: 'reporterecomendacionespropiedad', component: Reporterecomendacionespropiedad },
      { path: 'reportevistaspropiedad', component: Reportevistaspropiedad },
    ],
  },
];
