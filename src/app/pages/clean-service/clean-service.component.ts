import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateServiceComponent } from '@components/dialog-create-service/dialog-create-service.component';
import { DialogEditServiceComponent } from '@components/dialog-edit-service/dialog-edit-service.component';
import { DialogListDiscountServiceComponent } from '@components/dialog-list-discount-service/dialog-list-discount-service.component';
import { DialogListEmployeeServiceComponent } from '@components/dialog-list-employee-service/dialog-list-employee-service.component';
import { CleanServiceListDomain } from './clean-service-list.domain';

@Component({
  selector: 'app-clean-service',
  templateUrl: './clean-service.component.html',
  styleUrls: ['./clean-service.component.scss']
})
export class CleanServiceComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'price', 'note', 'createDate', 'detail'];
  dataSource = new MatTableDataSource<CleanServiceListDomain>(this.getServices());
  selection = new SelectionModel<any>(true, []);
  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  getServices(): Array<CleanServiceListDomain> {

    const peoples = Array<CleanServiceListDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new CleanServiceListDomain(123, i, "Tổng vệ sinh", "https://vesinhcongnghiepbluesky.com.vn/wp-content/uploads/2016/07/DICH-VU-CHUYEN-NGHIEP.png", "200,000", "Bao gồm các việc,....",

        "2021-12-12");
      peoples.push(domain);
    }

    return peoples;
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      console.log(sort.active);
      return;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }



  openDialogListEmployee(serviceId: string, serviceName: string) {
    const data = { serviceId, serviceName };
    const dialogRef = this.dialog.open(DialogListEmployeeServiceComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreateService() {
    const dialogRef = this.dialog.open(DialogCreateServiceComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogEditService(serviceId: string, serviceName: string) {
    const data = { serviceId, serviceName };
    const dialogRef = this.dialog.open(DialogEditServiceComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialoglistDiscountService(serviceId: string, serviceName: string) {
    const data = { serviceId, serviceName };
    const dialogRef = this.dialog.open(DialogListDiscountServiceComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
