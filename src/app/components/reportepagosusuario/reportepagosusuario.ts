import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { PagoXUsuarioDTO } from '../../models/PagoXUsuarioDTO';
import { Pagoservice } from '../../services/pagoservice';

@Component({
  selector: 'app-reportepagosusuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    BaseChartDirective,
  ],
  templateUrl: './reportepagosusuario.html',
  styleUrl: './reportepagosusuario.css',
  providers: [provideCharts(withDefaultRegisterables()), DatePipe],
})
export class Reportepagosusuario implements OnInit {
  hasData = false;

  inicioFiltro: Date | null = null;
  finFiltro: Date | null = null;

  detalle: PagoXUsuarioDTO[] = [];

  barChartType: 'bar' = 'bar';
  barChartLegend = true;

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `Pagos: ${ctx.parsed.y ?? ctx.parsed}`,
        },
      },
      title: {
        display: true,
        text: 'Cantidad de pagos por usuario',
        color: '#ffffff',
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
        },
        padding: { bottom: 12 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e5f0ff' },
        grid: {
          color: 'rgba(255,255,255,0.15)',
          lineWidth: 0.7,
        },
      },
      y: {
        ticks: { color: '#e5f0ff' },
        grid: {
          color: 'rgba(255,255,255,0.25)',
          lineWidth: 1,
        },
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(
    private pS: Pagoservice,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private formatDate(d: Date | null): string | undefined {
    if (!d) return undefined;
    const t = this.datePipe.transform(d, 'yyyy-MM-dd');
    return t ?? undefined;
  }

  cargarDatos(): void {
    const inicio = this.formatDate(this.inicioFiltro);
    const fin    = this.formatDate(this.finFiltro);

    this.pS.getPagosPorUsuario(inicio, fin).subscribe({
      next: (data) => {
        this.detalle = data;

        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map(
            (item) => `${item.nombre} ${item.apellido}`
          );
          const valores = data.map((item) => item.cantidadpagos);

          this.barChartData = {
            labels,
            datasets: [
              {
                data: valores,
                label: 'Cantidad de pagos',
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
        console.error('Error reporte pagos por usuario:', err);
        this.hasData = false;
        this.detalle = [];
        this.barChartData = { labels: [], datasets: [] };
      },
    });
  }

  limpiarFiltros(): void {
    this.inicioFiltro = null;
    this.finFiltro = null;
    this.cargarDatos();
  }
}
