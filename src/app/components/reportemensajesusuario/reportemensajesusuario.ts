import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgIf, NgFor } from '@angular/common';
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
import { ChartDataset, ChartOptions, ChartType, ChartData } from 'chart.js';

import { MensajeXUsuarioDTO } from '../../models/MensajeXUsuarioDTO';
import { MensajeService } from '../../services/mensajeservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportemensajesusuario',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './reportemensajesusuario.html',
  styleUrl: './reportemensajesusuario.css',
  providers: [provideCharts(withDefaultRegisterables()), DatePipe],
})
export class Reportemensajesusuario implements OnInit {
  hasData = false;

  inicioFiltro: Date | null = null;
  finFiltro: Date | null = null;

  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartOptions: ChartOptions = {
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
            `Mensajes: ${ctx.parsed.y ?? ctx.parsed}`, // por si cambia eje
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  detalle: MensajeXUsuarioDTO[] = [];

  constructor(
    private mS: MensajeService,
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
    const fin = this.formatDate(this.finFiltro);

    this.mS.getMensajesPorUsuario(inicio, fin).subscribe((data) => {
      this.detalle = data;
      if (data && data.length > 0) {
        this.hasData = true;
        const labels = data.map(
          (item) => `${item.nombre} ${item.apellido}`
        );
        const valores = data.map((item) => item.cantidadMensajes);

        this.barChartData = {
          labels,
          datasets: [
            {
              data: valores,
              label: 'Cantidad de mensajes por usuario',
              backgroundColor: [
                '#4F8BC9',
                '#72A4D9',
                '#90B7E3',
                '#3C6FA3',
                '#28537A',
              ],
              borderRadius: 6,
            } as ChartDataset<'bar'>,
          ],
        };
      } else {
        this.hasData = false;
        this.barChartData = { labels: [], datasets: [] };
      }
    });
  }

  limpiarFiltros(): void {
    this.inicioFiltro = null;
    this.finFiltro = null;
    this.cargarDatos();
  }
}
