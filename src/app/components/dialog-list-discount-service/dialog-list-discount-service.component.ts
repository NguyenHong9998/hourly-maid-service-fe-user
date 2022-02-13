import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';
import { ListDiscountServiceDomain } from './list-discount-service.domain';

@Component({
  selector: 'app-dialog-list-discount-service',
  templateUrl: './dialog-list-discount-service.component.html',
  styleUrls: ['./dialog-list-discount-service.component.scss']
})
export class DialogListDiscountServiceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'start', 'end', 'percent', 'status'];
  service_name: string = "";

  stars: number[] = [1, 2, 3, 4, 5];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  sortObj!: Sort;
  dataSource!: MatTableDataSource<ListDiscountServiceDomain>;
  discountList: Array<ListDiscountServiceDomain> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public http: HttpClient) {
    this.service_name = data.serviceName;
  }

  ngOnInit(): void {
    this.getListItemsDiscountServices();
  }

  sortData(sort: Sort) {
    this.sortObj = sort;
    this.getListItemsDiscountServices();
  }

  getListItemsDiscountServices() {
    const array = new Array<ListDiscountServiceDomain>();
    this.http.get(environment.apiUrl + "/service/" + this.data.serviceId + "/discount").subscribe(res => {
      const data = (res as any).data;
      for (let i = 0; i < data.length; i++) {
        const discount_name = data[i].name;
        const banner = data[i].banner;
        const percentage = data[i].percent;
        const date_start = data[i].start_date;
        const date_end = data[i].end_date;
        const status = data[i].status;

        const item = new ListDiscountServiceDomain(0, 0, discount_name, banner, percentage, date_start, date_end, status);
        array.push(item);

      }
      this.dataSource = new MatTableDataSource<ListDiscountServiceDomain>(this.discountList);
    })
  }
}
