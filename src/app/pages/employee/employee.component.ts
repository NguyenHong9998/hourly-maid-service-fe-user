import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogConfirmBlockEmployeeComponent } from '@components/dialog-confirm-block-employee/dialog-confirm-block-employee.component';
import { DialogCreateEmployeeComponent } from '@components/dialog-create-employee/dialog-create-employee.component';
import { DialogEditEmployeeInforComponent } from '@components/dialog-edit-employee-infor/dialog-edit-employee-infor.component';
import { DialogFeedbackOfEmployeeComponent } from '@components/dialog-feedback-of-employee/dialog-feedback-of-employee.component';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { EmployeeListDomain } from './employee-list.domain';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'name', 'email', 'status', 'role', 'detail'];
  dataSource !: MatTableDataSource<EmployeeListDomain>;
  selection = new SelectionModel<any>(true, []);

  notifyList: Array<EmployeeListDomain> = [];

  totalRow: number = 10;
  isLoading !: boolean;
  keySearch = new FormControl('');
  arrayPageSize = [10, 20, 30];
  sortObj!: Sort;
  mapPageToken = new Map();
  status!: string;
  offset !: number;

  pageSize = this.arrayPageSize[0];
  constructor(private dialog: MatDialog, public http: HttpClient, public customSnackbarService: CustomSnackbarService, public router: Router
  ) {
  }

  ngOnInit(): void {
    this.offset = 0;

    this.getLisEmployees();
  }

  getLisEmployees() {

    this.isLoading = true;

    let params = new HttpParams()
      .set('offset', this.offset)
      .set('limit', this.pageSize)
      .set('status', this.status ? this.status : '')
      .set('value_search', this.keySearch.value)
      .set('column_sort', this.sortObj && this.sortObj.direction ? this.sortObj.active.toUpperCase() : '')
      .set('type_sort', this.sortObj ? this.sortObj.direction.toUpperCase() : '');


    this.http.get(environment.apiUrl + "/user/list", { params: params })
      .subscribe((res: any) => {
        this.totalRow = res.total_rows;
        this._prepareEmplyeeList(res.data);
        this.isLoading = false;
      }
      );


  }
  _prepareEmplyeeList(data: any) {
    if (data) {
      const result = Array<EmployeeListDomain>();
      for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const position = i;
        const name = data[i].name;
        const email = data[i].email;
        const avatar = data[i].avatar;
        const status = data[i].status;
        const role = data[i].role;
        const phone = data[i].phone;
        const domain = new EmployeeListDomain(position, name, id, email, avatar, phone, status, role);

        result.push(domain);
      }
      this.notifyList = result;
      this.dataSource = new MatTableDataSource<EmployeeListDomain>(this.notifyList);
    }
  }

  onPaging(event: PageEvent) {
    this.selection.clear();
    if (event.pageSize !== this.pageSize) {
      this.mapPageToken = new Map();
      this.mapPageToken.set(1, 0);
      this.paginator.pageIndex = 0;
      event.pageIndex = 0;
    }
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex + 1;
    this.getLisEmployees();

  }

  onSearch() {
    this.clearSort();
    this.selection.clear();
    this.getLisEmployees();
  }

  sortData(sort: Sort) {

    this.sortObj = sort;
    this.paginator.pageIndex = 0;
    this.selection.clear();
    this.getLisEmployees();

  }
  clearSort() {
    this.sort.sort({ id: '', start: 'asc', disableClear: false });
    this.sortObj = {
      active: '',
      direction: '',
    };
    this.paginator.pageIndex = 0;
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
      this.getLisEmployees();
    });
  }

  openDialogCreateEmployee() {
    const dialogRef = this.dialog.open(DialogCreateEmployeeComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getLisEmployees();
    });
  }

  openDialogFeedbackOfEmployee(employeeId: string, elementName: string) {
    const data = { employeeId, elementName };

    const dialogRef = this.dialog.open(DialogFeedbackOfEmployeeComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogBlockEmployee(employeeId: number, elementName: string, elementAvatar: string, elementStatus: string) {
    const data = { employeeId, elementName, elementAvatar, elementStatus }
    const dialogRef = this.dialog.open(DialogConfirmBlockEmployeeComponent, { data });
    dialogRef.afterClosed().subscribe(() => {
      this.getLisEmployees();
    })
  }

  onFilter() {
    this.clearSort();
    this.selection.clear();
    this.getLisEmployees();
  }
}
