import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Contratoservice } from '../../services/contratoservice';
import { TopDistritoContratosDTO } from '../../models/TopDistritoContratosDTO';

@Component({
  selector: 'app-reportetopdistritos',
  standalone: true,
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reportetopdistritos.html',
  styleUrl: './reportetopdistritos.css',
})
export class Reportetopdistritos implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
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

  barChartType: 'bar' = 'bar';
  barChartLabels: string[] = [];
  barChartData: ChartDataset<'bar'>[] = [];

  constructor(private contratoService: Contratoservice) {}

  ngOnInit(): void {
    this.contratoService.getTopdistritosContrato().subscribe({
      next: (data: TopDistritoContratosDTO[]) => {
        console.log('Top distritos -> ', data);

        if (data && data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((d) => d.distrito);
          this.barChartData = [
            {
              data: data.map((d) => d.numeroDeContratos),
              label: 'Contratos activos',
              backgroundColor: ['#105590', '#1b72b9', '#2391ff', '#4aa3ff', '#82c0ff'],
              borderRadius: 10,
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: (err) => {
        console.error('Error top distritos:', err);
        this.hasData = false;
      },
    });
  }
}
