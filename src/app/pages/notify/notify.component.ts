import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
    displayedColumns: string[] = ['select', 'title', 'content', 'type', 'publish_date', 'detail'];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);
    constructor(
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

}
