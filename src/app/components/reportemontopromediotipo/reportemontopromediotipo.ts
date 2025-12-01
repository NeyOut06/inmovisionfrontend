import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

import { Contratoservice } from '../../services/contratoservice';
import { PromedioMontoPorTipoDTO } from '../../models/PromedioMontoPorTipoDTO';

@Component({
  selector: 'app-reportemontopromediotipo',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './reportemontopromediotipo.html',
  styleUrl: './reportemontopromediotipo.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportemontopromediotipo implements OnInit {

  hasData = false;

  // Datos para la tabla
  detalle: PromedioMontoPorTipoDTO[] = [];

  // Tipo de gráfico
  doughnutChartType: 'doughnut' = 'doughnut';

  // DATA del gráfico (mismo patrón que tu barChartData)
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  // Opciones
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false, // para que respete el .chart-container
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
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed as number;
            if (typeof value === 'number') {
              return `${ctx.label}: ${value.toLocaleString('es-PE', {
                style: 'currency',
                currency: 'PEN',
                minimumFractionDigits: 2,
              })}`;
            }
            return ctx.label || '';
          },
        },
      },
    },
  };

  constructor(private contratoService: Contratoservice) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.contratoService.getPromedioMontoTipoContrato().subscribe({
      next: (data: PromedioMontoPorTipoDTO[]) => {
        console.log('Monto promedio por tipo -> ', data);

        this.detalle = data ?? [];
        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map(item => item.tipo);
          const valores = data.map(item => item.promedioMonto);

          // Igual que en el barChart: recreamos TODO el objeto
          this.doughnutChartData = {
            labels,
            datasets: [
              {
                data: valores,
                label: 'Monto promedio por tipo de contrato',
                backgroundColor: [
                  '#105590',
                  '#1b72b9',
                  '#2391ff',
                  '#4aa3ff',
                  '#82c0ff',
                  '#c6e4ff',
                ],
                hoverOffset: 6,
                borderColor: 'rgba(7, 32, 54, 0.9)',
                borderWidth: 2,
              },
            ],
          };
        } else {
          this.hasData = false;
          this.doughnutChartData = { labels: [], datasets: [] };
        }
      },
      error: (err) => {
        console.error('Error monto promedio:', err);
        this.hasData = false;
        this.detalle = [];
        this.doughnutChartData = { labels: [], datasets: [] };
      },
    });
  }
}
