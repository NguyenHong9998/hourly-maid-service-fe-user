import { Component, OnInit } from '@angular/core';
import { EmployeeInforDomain } from './employee-infor-domain';

@Component({
  selector: 'app-employee-infor',
  templateUrl: './employee-infor.component.html',
  styleUrls: ['./employee-infor.component.scss']
})
export class EmployeeInforComponent implements OnInit {
  employees: Array<EmployeeInforDomain> = [];

  constructor() {
    this.employees = this.getEmployees();
  }

  ngOnInit(): void {
    this.employees = this.getEmployees();
  }

  getEmployees(): Array<EmployeeInforDomain> {
    const domain = new EmployeeInforDomain("Douglas  Pace", 123, "jane.cooper@example.com", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60");
    const peoples = Array<EmployeeInforDomain>();
    for (let i = 1; i <= 50; i++) {
      peoples.push(domain);
    }
    return peoples;
  }

}
