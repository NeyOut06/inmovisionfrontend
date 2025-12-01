import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

import { CalificacionService } from '../../services/calificacionservice';
import { ReporteCalificacionPromedioDTO } from '../../models/ReporteCalificacionPromedioDTO';

@Component({
  selector: 'app-reportecalificacion',
  standalone: true,
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reportecalificacion.html',
  styleUrl: './reportecalificacion.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportecalificacion implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Promedio de calificación por propiedad',
      color: '#ffffff',
      font: {
        family: 'Poppins, sans-serif',
        size: 16,
      },
      padding: {
        bottom: 16,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#e5f0ff',
      },
      grid: {
        // líneas verticales más visibles
        color: 'rgba(255, 255, 255, 0.10)',
        lineWidth: 0.7,
      },
    },
    y: {
      ticks: {
        color: '#e5f0ff',
      },
      grid: {
        // líneas horizontales más marcadas
        color: 'rgba(255, 255, 255, 0.25)',
        lineWidth: 1,
      },
    },
  },
};

  barChartLegend = true;
  barChartType: 'bar' = 'bar';
  barChartLabels: string[] = [];
  barChartData: ChartDataset<'bar'>[] = [];

  constructor(private cS: CalificacionService) {}

  ngOnInit(): void {
    this.cS.getCalificacionPromedio().subscribe(
      (data: ReporteCalificacionPromedioDTO[]) => {
        if (data && data.length > 0) {
          this.hasData = true;

          // Etiquetas: Propiedad + id
          this.barChartLabels = data.map(
            (item) => `Propiedad ${item.idPropiedad}`
          );

          // Dataset: promedio de puntuación
          this.barChartData = [
            {
              data: data.map((item) => item.promedioPuntuacion),
              label: 'Promedio de puntuación',
              backgroundColor: '#105590',
              hoverBackgroundColor: '#0c416a',
              borderRadius: 8,
            },
          ];
        } else {
          this.hasData = false;
        }
      }
    );
  }
}
