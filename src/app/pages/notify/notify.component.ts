import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogChangeStatusNotifyComponent } from '@components/dialog-change-status-notify/dialog-change-status-notify.component';
import { DialogCreateNotifyComponent } from '@components/dialog-create-notify/dialog-create-notify.component';
import { DialogEditNotifyComponent } from '@components/dialog-edit-notify/dialod-edit-notify.component';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { NotifyListDomain } from './notify.domain';

const DEFAULT_NOTIFY_LIST_PARAMS = {
    column_sort: '',
    limit: 1,
    offset: 1,
    type_sort: '',
    value_search: '',
    status: ''
};

const COLUMN_NAME_MAP = {
    title: 'TITLE',
    content: 'CONTENT',
    type: 'TYPE',
    status: 'STATUS'
};
@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    displayedColumns: string[] = ['select', 'title', 'content', 'type', 'status', 'detail'];
    dataSource!: MatTableDataSource<NotifyListDomain>;
    notifyList: Array<NotifyListDomain> = [];

    selection = new SelectionModel<any>(true, []);
    totalRow: number = 10;
    isLoading !: boolean;
    keySearch = new FormControl('');
    arrayPageSize = [10, 20, 30];
    sortObj!: Sort;
    mapPageToken = new Map();
    status!: string;
    offset !: number;

    pageSize = this.arrayPageSize[0];
    constructor(
        private dialog: MatDialog, public http: HttpClient, public customSnackbarService: CustomSnackbarService, public router: Router
    ) {
    }

    ngOnInit(): void {
        this.offset = 0;
        this.getListNotify();
    }

    sortData(sort: Sort) {

        this.sortObj = sort;
        this.paginator.pageIndex = 0;
        this.selection.clear();
        this.getListNotify();

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

        this.isLoading = true;

        let params = new HttpParams()
            .set('offset', this.offset)
            .set('limit', this.pageSize)
            .set('status', this.status ? this.status : '')
            .set('value_search', this.keySearch.value)
            .set('column_sort', this.sortObj && this.sortObj.direction ? this.sortObj.active.toUpperCase() : '')
            .set('type_sort', this.sortObj ? this.sortObj.direction.toUpperCase() : '');


        this.http.get(environment.apiUrl + "/notify", { params: params })
            .subscribe((res: any) => {
                this.totalRow = res.total_rows;
                this._prepareNotifyList(res.data);
                this.isLoading = false;
            }
            );


    }
    _prepareNotifyList(data: any) {
        if (data) {
            const result = Array<NotifyListDomain>();
            for (let i = 0; i < data.length; i++) {
                const id = data[i].id;
                const position = i;
                const title = data[i].title;
                const content = data[i].content;
                const type = data[i].type;
                const status = data[i].status;
                const domain = new NotifyListDomain(id as number, position as number, title, content, type, status);

                result.push(domain);
            }
            this.notifyList = result;
            this.dataSource = new MatTableDataSource<NotifyListDomain>(this.notifyList);
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
        this.getListNotify();

    }

    onSearch() {

        this.clearSort();
        this.selection.clear();
        this.getListNotify();
    }

    onFilter() {
        this.clearSort();
        this.selection.clear();
        this.getListNotify();
    }
    clearSort() {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
        this.sortObj = {
            active: '',
            direction: '',
        };
        this.paginator.pageIndex = 0;
    }

    openDialogEditNotify(notifyId: string, notifyStatus: string) {
        const data = { notifyId, notifyStatus };
        const dialogRef = this.dialog.open(DialogEditNotifyComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            this.getListNotify();
        });

    }

    openDialogCreateNotify() {
        const dialogRef = this.dialog.open(DialogCreateNotifyComponent);
        const { root, list } = ROUTER_UTILS.config.notify;
        dialogRef.afterClosed().subscribe(() => {
            this.getListNotify();
        });
    }
    openChangeStatusNotify(notifyId: any, notifyStatus: any) {
        if (notifyStatus == "Đã tạo") {
            const data = { notifyId };
            const dialogRef = this.dialog.open(DialogChangeStatusNotifyComponent, { data });
            dialogRef.afterClosed().subscribe(() => {
                this.getListNotify();
            });
        }
    }

    deleteNotify() {
        const body = {
            ids: this.selection.selected.map((item) => item.id)
        };
        this.http.post(environment.apiUrl + "/notify/delete", body).subscribe(data => {
            this.customSnackbarService.success("Xoá thông báo thành công");
            this.selection.clear();
            this.getListNotify();
        }
        )

    }
}
