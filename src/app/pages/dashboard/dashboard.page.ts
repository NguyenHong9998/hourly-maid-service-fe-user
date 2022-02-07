import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  public lineChartData: ChartDataSets[] = [
    { data: [0.2, 1, 2, 0.2, 1, 2, 0.2, 1, 2] },
  ];
  public lineChartLabels: any = ['06/03', '06/04', '06/05', '06/06', '06/07', '06/08', '06/09', '06/10'];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 0.5
        }
      }]
    },
    maintainAspectRatio: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#91E500',
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  range: FormGroup;
  campaignTwo: FormGroup;

  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 5
        }
      }],

    },
    maintainAspectRatio: false,
  };
  barChartLabels: Label[] = ['Tổng vệ sinh', 'Giặt ủi', 'Dọn vườn', 'Dọn nhà'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [{
    backgroundColor: "#fca5a5",
    borderColor: "#fca5a5",
  }];

  barChartData: ChartDataSets[] = [
    { barPercentage: 0.3, data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 5
        }
      }],

    },
    maintainAspectRatio: false,
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 15, y: 15, r: 15 },
        { x: 25, y: 15, r: 25 },
        { x: 36, y: 12, r: 33 },
        { x: 10, y: 18, r: 18 },
      ],
      label: 'Investment Equities',
    },
  ];
  public bubbleChartColors: Color[] = [
    {
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
      ]
    }
  ];
  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.range = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }
}
