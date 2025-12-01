import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { ReportePagosPorMetodoDTO } from '../../models/ReportePagosPorMetodoDTO';
import { Pagoservice } from '../../services/pagoservice';

@Component({
  selector: 'app-reportepagosmetodo',
  standalone: true,
  imports: [CommonModule, MatIconModule, BaseChartDirective],
  templateUrl: './reportepagosmetodo.html',
  styleUrl: './reportepagosmetodo.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportepagosmetodo implements OnInit {
  hasData = false;

  detalle: ReportePagosPorMetodoDTO[] = [];

  doughnutChartType: 'doughnut' = 'doughnut';

  doughnutChartOptions: ChartOptions<'doughnut'> = {
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

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  constructor(private pS: Pagoservice) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.pS.getReportePagosPorMetodo().subscribe({
      next: (data) => {
        this.detalle = data;

        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map((i) => i.metodoPago);
          const montos = data.map((i) => i.montoTotal);

          this.doughnutChartData = {
            labels,
            datasets: [
              {
                data: montos,
                label: 'Monto total por método',
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
        console.error('Error reporte pagos por método:', err);
        this.hasData = false;
        this.detalle = [];
        this.doughnutChartData = { labels: [], datasets: [] };
      },
    });
  }
}
