import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { ReportePropiedadesPorDistritoDTO } from '../../models/ReportePropiedadesPorDistritoDTO';
import { Propiedadservice } from '../../services/propiedadservice';

@Component({
  selector: 'app-reportepropiedadesdistrito',
  standalone: true,
  imports: [CommonModule, MatIconModule, BaseChartDirective],
  templateUrl: './reportepropiedadesdistrito.html',
  styleUrl: './reportepropiedadesdistrito.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportepropiedadesdistrito implements OnInit {
  hasData = false;

  detalle: ReportePropiedadesPorDistritoDTO[] = [];

  barChartType: 'bar' = 'bar';
  barChartLegend = false;

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#ffffff' } },
      title: {
        display: true,
        text: 'Cantidad de propiedades por distrito',
        color: '#ffffff',
        font: { family: 'Poppins, sans-serif', size: 16,  },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e5f0ff' },
        grid: { color: 'rgba(255,255,255,0.15)', lineWidth: 0.7 },
      },
      y: {
        ticks: { color: '#e5f0ff' },
        grid: { color: 'rgba(255,255,255,0.25)', lineWidth: 1,  },
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private pS: Propiedadservice) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.pS.getReportePropiedadesPorDistrito().subscribe({
      next: (data) => {
        this.detalle = data;
        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map((d) => d.distrito);
          const valores = data.map((d) => d.cantidadPropiedades);

          this.barChartData = {
            labels,
            datasets: [
              {
                data: valores,
                label: 'Propiedades',
                backgroundColor: [
                  '#4F8BC9',
                  '#72A4D9',
                  '#90B7E3',
                  '#3C6FA3',
                  '#28537A',
                ],
                borderRadius: 6,
              },
            ],
          };
        } else {
          this.hasData = false;
          this.barChartData = { labels: [], datasets: [] };
        }
      },
      error: (err) => {
        console.error('Error reporte propiedades por distrito:', err);
        this.hasData = false;
        this.detalle = [];
        this.barChartData = { labels: [], datasets: [] };
      },
    });
  }
}
