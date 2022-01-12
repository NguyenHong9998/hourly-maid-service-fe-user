import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateTaskComponent } from '@components/dialog-create-task/dialog-create-task.component';
import { DialogTaskDetailComponent } from '@components/dialog-task-detail/dialog-task-detail.component';
import { TaskListDomain } from './task.domain';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    displayedColumns: string[] = ['select', 'name', 'address', 'start', 'price', 'status', 'detail'];
    dataSource = new MatTableDataSource<TaskListDomain>(this.getTasks());
    selection = new SelectionModel<any>(true, []);
    constructor(
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    getTasks(): Array<TaskListDomain> {

        const discounts = Array<TaskListDomain>();
        for (let i = 1; i <= 7; i++) {
            const domain = new TaskListDomain(123,
                i,
                'Nguyễn Văn A',
                'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
                'K1/127 Ngô Sĩ Liên, Hòa khánh, Liên Chiểu, Đà Nẵng',
                '1',
                '2021-12-12 00:00',
                200000,
                'Đang diễn ra');
            discounts.push(domain);
        }
        const domain = new TaskListDomain(123,
            1,
            'Nguyễn Văn A',
            'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
            'K1/127 Ngô Sĩ Liên, Hòa khánh, Liên Chiểu, Đà Nẵng',
            '2',
            '2021-12-12 00:00',
            200000,
            'Hoàn thành');
        discounts.push(domain);

        const domain1 = new TaskListDomain(123,
            1,
            'Nguyễn Văn A',
            'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
            'K1/127 Ngô Sĩ Liên, Hòa khánh, Liên Chiểu, Đà Nẵng',
            '3',
            '2021-12-12 00:00',
            200000,
            'Hoàn thành');
        discounts.push(domain1);

        const domain2 = new TaskListDomain(123,
            1,
            'Nguyễn Văn A',
            'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
            'K1/127 Ngô Sĩ Liên, Hòa khánh, Liên Chiểu, Đà Nẵng',
            '4',
            '2021-12-12 00:00',
            200000,
            'Hoàn thành');
        discounts.push(domain2);
        return discounts;
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

    openDialogCreateTask() {
        const dialogRef = this.dialog.open(DialogCreateTaskComponent);

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    openDialogEditDiscounrService(discountId: string, discountName: string) {
        const data = { discountId, discountName };
        const dialogRef = this.dialog.open(DialogTaskDetailComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    openDialogGetListService(discountId: string, discountName: string) {

    }
}
