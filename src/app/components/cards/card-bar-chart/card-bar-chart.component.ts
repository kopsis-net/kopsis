import { Component, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration } from "chart.js/auto";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: `${new Date().getFullYear()}`,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: `${new Date().getFullYear() - 1}`,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
        },
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: "Month",
            },
            grid: {
              display: true,
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            title: {
              display: false,
              text: "Value",
            },
            grid: {
              display: true,
              color: "rgba(33, 37, 41, 0.2)",
            },
          },
        },
      },
    };

    const ctx = document.getElementById("bar-chart") as HTMLCanvasElement;
    const myChart = new Chart(ctx, config);
  }
}
