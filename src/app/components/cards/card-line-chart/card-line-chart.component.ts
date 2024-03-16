import { Component, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: `${new Date().getFullYear()}`,
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false
          },
          {
            label: `${new Date().getFullYear() - 1}`,
            fill: false,
            backgroundColor: '#ed64a6',
            borderColor: '#ed64a6',
            data: [40, 68, 86, 74, 56, 60, 87]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Sales Charts',
            color: 'white', // burada fontColor kullanılmalıdır
          },
          legend: {
            labels: {
              color: 'white'
            },
            align: 'end',
            position: 'bottom'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'rgba(255,255,255,.7)'
            },
            title: {
              display: false,
              text: 'Month',
              color: 'white'
            },
            grid: {
              display: false,
              color: 'rgba(33, 37, 41, 0.3)',
            }
          },
          y: {
            ticks: {
              color: 'rgba(255,255,255,.7)'
            },
            title: {
              display: false,
              text: 'Value',
              color: 'white'
            },
            grid: {
              display: false,
              color: 'rgba(255, 255, 255, 0.15)',
            }
          }
        }
      }
    };

    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, config);
  }
}
