import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCancelTaskComponent } from '@components/dialog-cancel-task/dialog-cancel-task.component';
import { DialogCreateTaskComponent } from '@components/dialog-create-task/dialog-create-task.component';
import { DialogDoneTaskComponent } from '@components/dialog-done-task/dialog-done-task.component';
import { DialogTaskDetailComponent } from '@components/dialog-task-detail/dialog-task-detail.component';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { TaskListDomain } from './task.domain';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    displayedColumns: string[] = ['select', 'name', 'work_date', 'start_time', 'end_time', 'status', 'detail'];
    dataSource!: MatTableDataSource<TaskListDomain>;
    taskList: Array<TaskListDomain> = [];

    selection = new SelectionModel<any>(true, []);
    totalRow: number = 10;
    isLoading !: boolean;
    keySearch = new FormControl('');
    arrayPageSize = [10, 20, 30];
    sortObj!: Sort;
    mapPageToken = new Map();
    status!: string;
    offset !: number;

    // statusList : string[] =['Đã tạo', 'Chưa giao NV', 'Hoàn thành', 'Đã huỷ'];
    statusList: any = [
        {
            name: "Đã tạo",
            icon: "note_add"
        },
        {
            name: "Chưa giao NV",
            icon: "assignment_ind"
        },
        {
            name: "Đã giao NV",
            icon: "assignment_ind"
        },

        {
            name: "Hoàn thành",
            icon: "done_all"
        },
        {
            name: "Đã huỷ",
            icon: "cancel_presentation"
        }
    ]
    selectedStatus !: string;
    pageSize = this.arrayPageSize[0];
    constructor(
        private dialog: MatDialog, public http: HttpClient, public snakbar: CustomSnackbarService
    ) {
    }

    ngOnInit(): void {
        this.offset = 0;
        this.getListTasks();
    }


    sortData(sort: Sort) {

        this.sortObj = sort;
        this.paginator.pageIndex = 0;
        this.selection.clear();
        this.getListTasks();

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.filter(x => x.status == 'Đã huỷ' || x.status == 'Hoàn thành').length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data.filter(x => x.status == 'Đã huỷ' || x.status == 'Hoàn thành'));
    }

    openDialogCreateTask() {
        const dialogRef = this.dialog.open(DialogCreateTaskComponent);

        dialogRef.afterClosed().subscribe(() => {
            this.getListTasks();
        });
    }

    openDialogEditTask(taskId: string, status: string) {
        const data = { taskId, status };
        const dialogRef = this.dialog.open(DialogTaskDetailComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            this.getListTasks();
        });
    }

    openDialogGetListService(discountId: string, discountName: string) {

    }

    onSearch() {

        this.clearSort();
        this.selection.clear();
        this.getListTasks();
    }

    clearSort() {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
        this.sortObj = {
            active: '',
            direction: '',
        };
        this.paginator.pageIndex = 0;
    }
    deleteTask() {
        const body = {
            ids: this.selection.selected.map((item) => item.id)
        };
        this.http.post(environment.apiUrl + "/task/delete", body).subscribe(data => {
            this.snakbar.success("Xoá công việc thành công");
            this.selection.clear();
            this.getListTasks();
        }
        )
    }

    getListTasks() {
        this.isLoading = true;
        let status = '';
        if (!this.selectedStatus || this.selectedStatus[0] == 'Đã tạo') {
            status = '';
        } else {
            status = this.selectedStatus[0];
        }
        let params = new HttpParams()
            .set('offset', this.offset)
            .set('limit', this.pageSize)
            .set('status', status)
            .set('value_search', this.keySearch.value)
            .set('column_sort', this.sortObj && this.sortObj.direction ? this.sortObj.active.toUpperCase() : '')
            .set('type_sort', this.sortObj ? this.sortObj.direction.toUpperCase() : '');
        this.http.get(environment.apiUrl + "/task", { params: params })
            .subscribe((res: any) => {
                this.totalRow = res.total_rows;
                this._prepareTaskList(res.data);
                this.isLoading = false;
            }
            );
    }
    _prepareTaskList(data: any) {
        console.log(data);
        if (data) {
            const result = Array<TaskListDomain>();
            for (let i = 0; i < data.length; i++) {
                const id = data[i].id;
                const user_name = data[i].user_name;
                const user_avatar = data[i].user_avatar;
                const address = data[i].address;
                const startTime = data[i].start_time;
                const endTime = data[i].end_time;
                const workDate = data[i].work_date;
                const status = data[i].status;
                const domain = new TaskListDomain(id as number, user_name, user_avatar, address, workDate, startTime, endTime, status);
                result.push(domain);
            }
            this.taskList = result;
            this.dataSource = new MatTableDataSource<TaskListDomain>(this.taskList);
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
        this.getListTasks();

    }

    onSelectStatusChange(event: any) {
        this.getListTasks();
    }

    cancelTask(taskId: any, status: any) {
        const data = { taskId };
        const dialogRef = this.dialog.open(DialogCancelTaskComponent, { data });
        dialogRef.afterClosed().subscribe((data: any) => {
            if (data.isChange) {
                this.getListTasks();
            }
        })
    }

    doneTask(taskId: any, status: any) {
        const data = { taskId };
        const dialogRef = this.dialog.open(DialogDoneTaskComponent, { data });
        dialogRef.afterClosed().subscribe((data: any) => {
            if (data.isChange) {
                this.getListTasks();
            }
        })
    }
}
