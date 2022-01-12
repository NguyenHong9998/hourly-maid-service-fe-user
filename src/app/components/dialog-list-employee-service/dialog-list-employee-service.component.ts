import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListServiceEmployeeListDomain } from './list-service-employee.domain';

@Component({
  selector: 'app-dialog-list-employee-service',
  templateUrl: './dialog-list-employee-service.component.html',
  styleUrls: ['./dialog-list-employee-service.component.scss']
})
export class DialogListEmployeeServiceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'level'];
  dataSource: any;
  service_name: string = "";
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.service_name = data.serviceName;
    console.log(this.service_name);
    // this.dataSource.data = this.getListItemsEmloyeeServices();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ListServiceEmployeeListDomain>(this.getListItemsEmloyeeServices());
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
  }
  getListItemsEmloyeeServices(): Array<ListServiceEmployeeListDomain> {
    const employee = Array<ListServiceEmployeeListDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new ListServiceEmployeeListDomain(123, i,
        "Nguyen Thi A", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        4);
      employee.push(domain);
    }
    return employee;
  }
}
