import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateDiscountServiceComponent } from '@components/dialog-create-discount-service/dialog-create-discount-service.component';
import { DialogEditDiscountServiceComponent } from '@components/dialog-edit-discount-service/dialog-edit-discount-service.component';
import { DiscountServiceListDomain } from './discount-service.domain';

@Component({
    selector: 'app-discount-service',
    templateUrl: './discount-service.component.html',
    styleUrls: ['./discount-service.component.scss'],
})
export class DiscountServiceComponent implements OnInit {
    displayedColumns: string[] = ['select', 'name', 'start', 'end', 'status', 'num_service', 'detail'];
    dataSource = new MatTableDataSource<DiscountServiceListDomain>(this.getDiscountServices());
    selection = new SelectionModel<any>(true, []);
    constructor(
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    getDiscountServices(): Array<DiscountServiceListDomain> {

        const discounts = Array<DiscountServiceListDomain>();
        for (let i = 1; i <= 10; i++) {
            const domain = new DiscountServiceListDomain(i,
                i,
                'Khuyến mãi dịp tết',
                'Khuyến mãi áp dụng dịp tết mang lại nhà sạch cho bạn',
                'https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg',
                '2021-12-12 00:00',
                '2021-15-12 00:00', 'Đang diễn ra', 2);
            discounts.push(domain);
        }

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

    openDialogCreateDiscountService() {
        const dialogRef = this.dialog.open(DialogCreateDiscountServiceComponent);

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    openDialogEditDiscounrService(discountId: string, discountName: string) {
        const data = { discountId, discountName };
        const dialogRef = this.dialog.open(DialogEditDiscountServiceComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    openDialogGetListService(discountId: string, discountName: string) {

    }
}
