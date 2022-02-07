import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateLeaveDateComponent } from '@components/dialog-create-leave-date/dialog-create-leave-date.component';

export class LeaveDateOfEmployee {
  id: number;
  user_name: string;
  user_avatar: string;
  date: string;
  level: number;
  constructor(id: number, user_name: string, user_avatar: string, date: string,
    level: number) {
    this.user_avatar = user_avatar;
    this.user_name = user_name;
    this.date = date;
    this.level = level;
    this.id = id;
  }
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  currentSelectedDate: any;
  displayedColumns: string[] = ['select', 'name', 'date', 'level', 'detail'];
  dataSource = new MatTableDataSource<LeaveDateOfEmployee>(this.getListLeaveDate(new Date()));
  selection = new SelectionModel<any>(true, []);
  constructor(private dialog: MatDialog) {
  }


  daysSelected: any[] = ["2022-01-20", "2022-01-15"];
  event: any;
  isSelected: MatCalendarCellClassFunction<Date> = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : "";
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }

  getListLeaveDate(date: Date) {
    var result = Array<LeaveDateOfEmployee>();
    for (let i = 0; i <= 5; i++) {
      result.push(new LeaveDateOfEmployee(i, "Nguyen Van A", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60", "12-12-2022", 1));
    }
    return result;
  }

  openDialogCreateLeaveDate() {
    this.dialog.open(DialogCreateLeaveDateComponent);
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

  ngOnInit(): void {

  }
}
