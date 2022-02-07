import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmBlockEmployeeComponent } from '@components/dialog-confirm-block-employee/dialog-confirm-block-employee.component';
import { DialogCreateEmployeeComponent } from '@components/dialog-create-employee/dialog-create-employee.component';
import { DialogEditEmployeeInforComponent } from '@components/dialog-edit-employee-infor/dialog-edit-employee-infor.component';
import { DialogFeedbackOfEmployeeComponent } from '@components/dialog-feedback-of-employee/dialog-feedback-of-employee.component';
import { EmployeeListDomain } from './employee-list.domain';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  displayedColumns: string[] = ['select', 'name', 'email', 'status', 'role', 'detail'];
  dataSource = new MatTableDataSource<EmployeeListDomain>(this.getEmployees());
  selection = new SelectionModel<any>(true, []);
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getEmployees(): Array<EmployeeListDomain> {

    const peoples = Array<EmployeeListDomain>();
    for (let i = 1; i <= 9; i++) {
      const domain = new EmployeeListDomain(i, "Jane Cooper", 123, "jane.cooper@example.com",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        "Đã xác thực", "Hoạt động", "Nhân viên");
      peoples.push(domain);
    }
    const domain = new EmployeeListDomain(10, "Jane Cooper", 123, "jane.cooper@example.com",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      "Đã xác thực", "Tạm khóa", "Nhân viên");
    peoples.push(domain);
    return peoples;
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      console.log(sort.active);
      return;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  openDialogEmployeeInfor(employeeId: string, elementName: string) {
    const data = { employeeId, elementName };
    const dialogRef = this.dialog.open(DialogEditEmployeeInforComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreateEmployee() {
    const dialogRef = this.dialog.open(DialogCreateEmployeeComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogFeedbackOfEmployee(employeeId: string, elementName: string) {
    const data = { employeeId, elementName };

    const dialogRef = this.dialog.open(DialogFeedbackOfEmployeeComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogBlockEmployee(employeeId: number, elementName: string, elementAvatar : string, elementStatus : string) {
    const data = {employeeId, elementName, elementAvatar, elementStatus}
    const dialogRef = this.dialog.open(DialogConfirmBlockEmployeeComponent, {data});
    dialogRef.afterClosed().subscribe(() => {

    })
  }
}
