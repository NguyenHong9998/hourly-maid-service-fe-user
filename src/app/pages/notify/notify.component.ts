import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateNotifyComponent } from '@components/dialog-create-notify/dialog-create-notify.component';
import { DialogEditNotifyComponent } from '@components/dialog-edit-notify/dialod-edit-notify.component';
import { NotifyListDomain } from './notify.domain';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
    displayedColumns: string[] = ['select', 'title', 'content', 'type', 'status', 'detail'];
    dataSource = new MatTableDataSource<NotifyListDomain>(this.getListNotify());
    selection = new SelectionModel<any>(true, []);
    constructor(
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
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

    getListNotify() {
        const notifys = Array<NotifyListDomain>();
        for (let i = 1; i <= 7; i++) {
            const domain = new NotifyListDomain(123,
                i,
                "Thông báo về thêm dịch vụ mới", "Dịch vụ Tổng vệ sinh ra mắt", "Nhân viên", "Đã gửi");
            notifys.push(domain);
        }

        return notifys;

    }

    openDialogEditNotify(notifyId: string, title: string) {
        const data = { notifyId, title };
        const dialogRef = this.dialog.open(DialogEditNotifyComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });

    }

    openDialogCreateNotify() {
        const dialogRef = this.dialog.open(DialogCreateNotifyComponent);

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

}
