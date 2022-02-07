import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { addDays, compareAsc, format } from 'date-fns';
export class LeaveDate {
  id: number;
  date: string;
  level: number;
  constructor(id: number, date: string,
    level: number) {
    this.date = date;
    this.level = level;
    this.id = id;
  }
}
@Component({
  selector: 'app-dialog-create-leave-date',
  templateUrl: './dialog-create-leave-date.component.html',
  styleUrls: ['./dialog-create-leave-date.component.scss']
})
export class DialogCreateLeaveDateComponent implements OnInit {
  selectedValue: any;
  exampleForm: FormGroup | any;
  displayedColumns: string[] = ['date', 'morning', 'afternoon', 'all_date', 'delete'];
  dataSource = new MatTableDataSource<LeaveDate>();
  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
  row: any;

  constructor(public dialogRef: MatDialogRef<DialogCreateLeaveDateComponent>, private formBuilder: FormBuilder,
  ) {
    this.row = this.getListLeaveDate(this.range.controls.start.value, this.range.controls.end.value);
    this.dataSource = new MatTableDataSource<LeaveDate>(this.row);

  }

  deleteRow(x: any) {
    let indexOfDeleteItem = null;
    for (let index = 0; index < this.row.length; index++) {
      if (this.row[index].date == x) {
        indexOfDeleteItem = index;
      }
    }
    this.row.splice(indexOfDeleteItem, 1);
    this.dataSource = new MatTableDataSource<LeaveDate>(this.row);
  }
  employees: any = [
    {
      name: "Toàn bộ nhân viên",
      id: 0
    },
    {
      name: "Nguyen Van A",
      id: 1
    },
    {
      name: "Nguyen Van A",
      id: 1
    },
    {
      name: "Nguyen Van A",
      id: 1
    },
    {
      name: "Nguyen Van A",
      id: 1
    }
  ]

  ngOnInit(): void {
    // this.range.get('start')?.valueChanges.subscribe(res=>{
    //   console.log("valueChange start",res);
    // });
    this.range.get('end')?.valueChanges.subscribe(res => {
      var start = this.range.get('start')?.value;
      var end = res;
      if(start != null && end != null){
        this.row = this.getListLeaveDate(start, end);
        this.dataSource = new MatTableDataSource<LeaveDate>(this.row);
      }
    })

  }


  onNoClick() {
    this.dialogRef.close();
  }

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  getListLeaveDate(start: Date, end: Date): LeaveDate[] | undefined {
    var currentDate = start;
    var endDate = end;
    var arr = []
    var i = 1;
    var newDate = currentDate;

    while (compareAsc(newDate, endDate)) {
      arr.push(new LeaveDate(i, format(newDate, "dd - MM - yyyy"), 3));
      newDate = addDays(newDate, 1);
      i++;
    }
    arr.push(new LeaveDate(i, format(endDate, "dd - MM - yyyy"), 3));
    return arr;
  }

  setAssessmentLevel(leaveDate: any, value: any) {
    var leaveDate = this.row[this.row.indexOf(leaveDate)];
    leaveDate.level = value;

  }
  saveLeaveDate() {
    console.log(this.row);
  }


  startChange(event: MatDatepickerInputEvent<any, any>) {
    var start = event.value;
    var end = this.range.controls.end.value;
    this.row = this.getListLeaveDate(start, end);
    this.dataSource = new MatTableDataSource<LeaveDate>(this.row);
    console.log("startChange", event.value)
  }
  endChange(event: MatDatepickerInputEvent<any, any>) {
    var end = event.value;
    var start = this.range.controls.start.value;
    this.row = this.getListLeaveDate(start, end);
    this.dataSource = new MatTableDataSource<LeaveDate>(this.row);
    console.log("startChange", event.value)
  }
}
