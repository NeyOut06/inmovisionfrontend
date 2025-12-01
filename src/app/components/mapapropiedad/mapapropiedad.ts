import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propiedadservice } from '../../services/propiedadservice';
import { Propiedad } from '../../models/Propiedad';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


declare var google: any;

@Component({
  selector: 'app-mapapropiedad',
  templateUrl: './mapapropiedad.html',
  styleUrls: ['./mapapropiedad.css'],
  imports: [RouterLink, MatButtonModule]
  
})
export class MapapropiedadComponent implements OnInit {
  propiedadId!: number;
  propiedad!: Propiedad;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: Propiedadservice
  ) {}

  ngOnInit(): void {
    // 1. Tomar el id de la ruta
    this.propiedadId = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Traer la propiedad desde el backend (USANDO EL SERVICIO)
    this.propiedadService.listId(this.propiedadId).subscribe({
      next: (data) => {
        this.propiedad = data;

        const lat = Number(this.propiedad.latitud);
        const lng = Number(this.propiedad.longitud);

        // 3. Dibujar el mapa con esas coordenadas
        this.initMap(lat, lng);
      },
      error: (err) => {
        console.error('Error al obtener la propiedad', err);
      }
    });
  }

  private initMap(lat: number, lng: number): void {
    const mapElement = document.getElementById('mapa') as HTMLElement; // ojo con el id

    if (!mapElement) {
      console.error('No se encontró el elemento con id "mapa"');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 15
    });

    new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: 'Ubicación de la propiedad',
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
  }
}