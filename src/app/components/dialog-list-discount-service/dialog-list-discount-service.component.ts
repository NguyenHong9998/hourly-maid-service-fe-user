import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListDiscountServiceDomain } from './list-discount-service.domain';

@Component({
  selector: 'app-dialog-list-discount-service',
  templateUrl: './dialog-list-discount-service.component.html',
  styleUrls: ['./dialog-list-discount-service.component.scss']
})
export class DialogListDiscountServiceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'start', 'end', 'percent', 'status'];
  dataSource: any;
  service_name: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.service_name = data.serviceName;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ListDiscountServiceDomain>(this.getListItemsDiscountServices());
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
  }
  getListItemsDiscountServices(): Array<ListDiscountServiceDomain> {
    const discounts = Array<ListDiscountServiceDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new ListDiscountServiceDomain(i,
        i,
        'Khuyến mãi dịp tết',
        'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
        '20%',
        '2021-12-12 00:00',
        '2021-15-12 00:00', 'Đang diễn ra');
      discounts.push(domain);
    }

    const domain2 = new ListDiscountServiceDomain(11,
      11,
      'Khuyến mãi dịp tết',
      'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
      '20%',
      '2021-12-12 00:00',
      '2021-15-12 00:00', 'Kết thúc');
    discounts.push(domain2)
    return discounts;
  }
}
