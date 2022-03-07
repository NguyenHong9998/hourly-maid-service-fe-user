import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { RandomColor } from 'angular-randomcolor';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { format } from 'date-fns';
import { Color, Label } from 'ng2-charts';

export class Service {
  banner: string;
  name: string;
  num_task: string;

  constructor(banner: string,
    name: string,
    num_task: string) {
    this.banner = banner;
    this.name = name;
    this.num_task = num_task;
  }
}

export class User {
  avatar: string;
  name: string;
  num_star: string;

  constructor(avatar: string,
    name: string,
    num_star: string) {
    this.avatar = avatar;
    this.name = name;
    this.num_star = num_star;

  }
}
@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  public lineChartData: ChartDataSets[] = [{ data: [0.2, 1, 2, 0.2, 1, 2, 0.2, 1, 5] },];
  public lineChartLabels: any = ['06/03', '06/04', '06/05', '06/06', '06/07', '06/08', '06/09', '06/10'];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  num_cancel!: string;
  num_create!: string;
  num_done!: string;
  percent_cancel!: string;
  percent_create!: string;
  percent_done!: string;

  public lineChartDataService: ChartDataSets[] = [{ data: [0.2, 1, 2, 0.2, 1, 2, 0.2, 1] },];
  public lineChartLabelsService: any = ['06/03', '06/04', '06/05', '06/06', '06/07', '06/08', '06/09', '06/10'];
  lineChartServiceColors: Color[] = [{

  }];
  max_service !: Service;
  min_service !: Service;
  num_service !: string;

  max_user !: User;
  min_user !: User;
  num_user !: string;

  range = new FormGroup({
    start: new FormControl(new Date(new Date().getTime() - 7 * 86400000)),
    end: new FormControl(new Date(new Date().getTime()))
  });

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(new Date().getTime() - 7 * 86400000)),
    end: new FormControl(new Date(new Date().getTime() - 86400000))
  });

  campaignThree = new FormGroup({
    start: new FormControl(new Date(new Date().getTime() - 7 * 86400000)),
    end: new FormControl(new Date(new Date().getTime() - 86400000))
  });

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

  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.getTaskOverview();
    this.getServiceOverview();
    this.getUserOverview();
  }

  public lineChartServiceOptions: any = {
    responsive: true,
    legend: {
      display: true
    },
    elements: {
      line: {
        tension: 0,
        fill: false
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 2
        }
      }]
    },
    maintainAspectRatio: false,
  };
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
          stepSize: 2
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

  getTaskOverview() {
    const start = format(this.range.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.range.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/task/overview", { params: params }).subscribe((data: any) => {
      this.num_cancel = data.data.num_cancel;
      this.num_create = data.data.num_create;
      this.num_done = data.data.num_done;
      this.percent_cancel = data.data.percent_cancel;
      this.percent_create = data.data.percent_create;
      this.percent_done = data.data.percent_done;
      const taskOnDate = data.data.details;
      const dataSet = new Array();
      const dateSet = new Array();
      for (let i = 0; i < taskOnDate.length; i++) {
        dataSet.push(taskOnDate[i].number);
        dateSet.push(taskOnDate[i].date)
      }
      this.lineChartData = [{ data: dataSet }]
      this.lineChartLabels = dateSet;
    })
  }

  getTaskOverviewDetail() {
    const start = format(this.range.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.range.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/task/overview/detail", { params: params }).subscribe((data: any) => {
      const taskOnDate = data.data;
      const dataSet = new Array();
      const dateSet = new Array();
      for (let i = 0; i < taskOnDate.length; i++) {
        dataSet.push(taskOnDate[i].number);
        dateSet.push(taskOnDate[i].date)
      }
      this.lineChartData = [{ data: dataSet }]
      this.lineChartLabels = dateSet;
    })
  }

  getServiceOverview() {
    const start = format(this.range.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.range.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/service/overview", { params: params }).subscribe((data: any) => {
      console.log(data);

      this.num_service = data.data.num_service;
      this.max_service = new Service(data.data.max_service.banner, data.data.max_service.name, data.data.max_service.num_task);
      this.min_service = new Service(data.data.min_service.banner, data.data.min_service.name, data.data.min_service.num_task);

      const dateSet = new Array();
      const detailsItem = data.data.details[0].details
      for (let i = 0; i < detailsItem.length; i++) {
        dateSet.push(detailsItem[i].date)
      }
      this.lineChartLabelsService = dateSet;
      const detailsList = data.data.details;
      const colors = [];
      const dataSetService = [];
      for (let i = 0; i < detailsList.length; i++) {
        const dataSet = new Array();
        const detailItem = detailsList[i].details;
        for (let j = 0; j < detailItem.length; j++) {
          dataSet.push(detailItem[j].number);
        }
        dataSetService.push({ data: dataSet, label: detailsList[i].service })
        const color = RandomColor.generateColor();
        colors.push({
          backgroundColor: color,
          borderColor: color,
        })
      }
      this.lineChartServiceColors = colors;

      this.lineChartDataService = dataSetService;
    })
  }

  getServiceOverviewDetail() {
    const start = format(this.campaignTwo.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.campaignTwo.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/service/overview/detail", { params: params }).subscribe((data: any) => {
      console.log(data);

      const dateSet = new Array();
      const detailsItem = data.data[0].details
      for (let i = 0; i < detailsItem.length; i++) {
        dateSet.push(detailsItem[i].date)
      }
      this.lineChartLabelsService = dateSet;
      const detailsList = data.details;
      const colors = [];
      const dataSetService = [];
      for (let i = 0; i < detailsList.length; i++) {
        const dataSet = new Array();
        const detailItem = detailsList[i].details;
        for (let j = 0; j < detailItem.length; j++) {
          dataSet.push(detailItem[j].number);
        }
        dataSetService.push({ data: dataSet, label: detailsList[i].service })
        const color = RandomColor.generateColor();
        colors.push({
          borderWidth: 1,
          borderColor: color,
          backgroundColor: 'transparent',
        })
      }
      this.lineChartServiceColors = colors;

      this.lineChartDataService = dataSetService;
    })

  }

  getUserOverview() {
    const start = format(this.campaignThree.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.campaignThree.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/user/overview", { params: params }).subscribe((data: any) => {
      console.log(data);

      const details = data.data.details;
      const labels = new Array();
      const datasSet = [];
      for (let i = 0; i < details.length; i++) {
        labels.push(details[i].full_name);
        datasSet.push(details[i].num_star);

        this.max_user = new User(data.data.max_user.avatar , data.data.max_user.full_name, data.data.max_user.num_star);

        this.min_user = new User(data.data.min_user.avatar, data.data.min_user.full_name, data.data.min_user.num_star);

        this.num_user = data.data.num_of_user;
      }
      const barChartDataUser = [{ barPercentage: 0.3, data: datasSet, label: 'Số sao' }];
      this.barChartData = barChartDataUser;
      this.barChartLabels = labels;
    })
  }

  getUserOverviewDetail(){
    const start = format(this.campaignThree.get('start')?.value, "yyyy-MM-dd");
    const end = format(this.campaignThree.get('end')?.value, "yyyy-MM-dd");

    let params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
    this.http.get(environment.apiUrl + "/user/overview/detail", { params: params }).subscribe((data: any) => {
      const details = data.data;
      const labels = new Array();
      const datasSet = [];
      for (let i = 0; i < details.length; i++) {
        labels.push(details[i].full_name);
        datasSet.push(details[i].num_star);
      }
      const barChartDataUser = [{ barPercentage: 0.3, data: datasSet, label: 'Số sao' }];
      this.barChartData = barChartDataUser;
      this.barChartLabels = labels;

    })
  }
}
