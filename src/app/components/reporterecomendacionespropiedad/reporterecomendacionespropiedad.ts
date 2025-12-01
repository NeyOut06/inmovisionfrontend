import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { ReporteRecomendacionesPorPropiedadDTO } from '../../models/ReporteRecomendacionesPorPropiedadDTO';
import { Recomendacionservice } from '../../services/recomendacionservice';

@Component({
  selector: 'app-reporterecomendacionespropiedad',
  standalone: true,
  imports: [CommonModule, MatIconModule, BaseChartDirective],
  templateUrl: './reporterecomendacionespropiedad.html',
  styleUrl: './reporterecomendacionespropiedad.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reporterecomendacionespropiedad implements OnInit {
  hasData = false;
  detalle: ReporteRecomendacionesPorPropiedadDTO[] = [];

  // 🔹 Nuevo tipo de gráfico
  polarChartType: 'polarArea' = 'polarArea';

  polarChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#ffffff',
          usePointStyle: true,
          boxWidth: 10,
          font: {
            family: 'Poppins, sans-serif',
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Recomendaciones por propiedad',
        color: '#ffffff',
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
        },
        padding: { bottom: 12 },
      },
      
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid: { color: 'rgba(255,255,255,0.25)' },
        ticks: {
          color: '#e5f0ff',
          showLabelBackdrop: false,
        },
        pointLabels: {
          color: '#e5f0ff',
        },
      },
    },
  };

  polarChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [],
  };

  constructor(private rS: Recomendacionservice) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.rS.getReporteRecomendacionesPorPropiedad().subscribe({
      next: (data) => {
        this.detalle = data;

        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map((d) => `Propiedad ${d.idPropiedad}`);
          const valores = data.map((d) => d.cantidadRecomendaciones);

          this.polarChartData = {
            labels,
            datasets: [
              {
                data: valores,
                label: 'Recomendaciones',
                backgroundColor: [
                  '#4F8BC9',
                  '#72A4D9',
                  '#90B7E3',
                  '#3C6FA3',
                  '#28537A',
                  '#1b385c',
                ],
                borderWidth: 1,
                borderColor: 'rgba(7, 32, 54, 0.9)',
              },
            ],
          };
        } else {
          this.hasData = false;
          this.polarChartData = { labels: [], datasets: [] };
        }
      },
      error: (err) => {
        console.error('Error reporte recomendaciones por propiedad:', err);
        this.hasData = false;
        this.detalle = [];
        this.polarChartData = { labels: [], datasets: [] };
      },
    });
  }
}
