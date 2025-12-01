import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { Favoritoservice } from '../../services/favoritoservice';
import { ReporteFavoritosPorPropiedadDTO } from '../../models/ReporteFavoritosPorPropiedadDTO';

@Component({
  selector: 'app-reportefavoritospropiedad',
  standalone: true,
  imports: [ MatIconModule, BaseChartDirective, CommonModule],
  templateUrl: './reportefavoritospropiedad.html',
  styleUrl: './reportefavoritospropiedad.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Reportefavoritospropiedad implements OnInit {

  hasData = false;
  noData = false;

  barChartType: 'bar' = 'bar';
  barChartLegend = true;

  // Objeto completo de datos del gráfico
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'N° de favoritos por propiedad',
        backgroundColor: [
          '#4b4dccff',
          '#303b79ff',
          '#F5F5DC',
          '#1C1C1C',
          '#3d508dff'
        ],
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#FFFFFF' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  dataTabla: ReporteFavoritosPorPropiedadDTO[] = [];

  constructor(private fS: Favoritoservice) {}

  ngOnInit(): void {
    this.fS.getReporteFavoritosPorPropiedad().subscribe((data) => {
      this.dataTabla = data;

      if (data && data.length > 0) {
        this.hasData = true;
        this.noData = false;

        this.barChartData.labels = data.map(
          (item) => `Propiedad ${item.idPropiedad}`
        );
        this.barChartData.datasets[0].data = data.map(
          (item) => item.cantidadFavoritos
        );
      } else {
        this.hasData = false;
        this.noData = true;
      }
    });
  }
}
