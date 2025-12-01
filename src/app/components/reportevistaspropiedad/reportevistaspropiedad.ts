import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { ReporteVisitasPorPropiedadDTO } from '../../models/ReporteVisitasPorPropiedadDTO';
import { VisitaService } from '../../services/visitaservice';

@Component({
  selector: 'app-reportevistaspropiedad',
  standalone: true,
  imports: [CommonModule, MatIconModule, BaseChartDirective],
  templateUrl: './reportevistaspropiedad.html',
  styleUrl: './reportevistaspropiedad.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportevistaspropiedad implements OnInit {
  hasData = false;
  detalle: ReporteVisitasPorPropiedadDTO[] = [];

  // 🔹 Gráfico de líneas
  lineChartType: 'line' = 'line';

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          usePointStyle: true,
          boxWidth: 10,
          font: {
            family: 'Poppins, sans-serif',
            size: 11,
          },
        },
      },
      title: {
        display: true,
        text: 'Visitas por propiedad según estado',
        color: '#ffffff',
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
        },
        padding: { bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y as number;
            return `${ctx.dataset.label}: ${value ?? 0} visitas`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e5f0ff' },
        grid: { color: 'rgba(255,255,255,0.15)' },
      },
      y: {
        ticks: { color: '#e5f0ff' },
        grid: { color: 'rgba(255,255,255,0.25)',  },
      },
    },
  };

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  constructor(private vS: VisitaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.vS.getReporteVisitasPorPropiedad().subscribe({
      next: (data) => {
        this.detalle = data;

        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map((d) => `Propiedad ${d.idPropiedad}`);
          const pendientes = data.map((d) => d.pendientes);
          const completadas = data.map((d) => d.completadas);
          const canceladas = data.map((d) => d.canceladas);

          this.lineChartData = {
            labels,
            datasets: [
              {
                data: pendientes,
                label: 'Pendientes',
                fill: false,
                tension: 0.2,
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.3)',
                pointBackgroundColor: '#FFC107',
                pointRadius: 4,
              },
              {
                data: completadas,
                label: 'Completadas',
                fill: false,
                tension: 0.2,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.3)',
                pointBackgroundColor: '#4CAF50',
                pointRadius: 4,
              },
              {
                data: canceladas,
                label: 'Canceladas',
                fill: false,
                tension: 0.2,
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.3)',
                pointBackgroundColor: '#F44336',
                pointRadius: 4,
              },
            ],
          };
        } else {
          this.hasData = false;
          this.lineChartData = { labels: [], datasets: [] };
        }
      },
      error: (err) => {
        console.error('Error reporte visitas por propiedad:', err);
        this.hasData = false;
        this.detalle = [];
        this.lineChartData = { labels: [], datasets: [] };
      },
    });
  }
}
