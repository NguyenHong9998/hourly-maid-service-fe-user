import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss']
})
export class DialogTaskDetailComponent implements OnInit {

  task_detail = {
    user_name: "Nguyen Thi A",
    user_phone: "0395077731",
    address: {
      address: "K1/127 Ngô Sĩ Liên, Hòa Khánh, Liên CHiểu, Đà Nẵng",
      type: {
        code: 1,
        name: "Dia chi nha"
      }
    },
    startTime: "2021-12-12 12:00",
    endTime: "2021-12-12 14:00",
    note: "Dọn nhà ăn tết",
    service: [
      {
        id: 1,
        name: "Tong Ve sinh",
        price: 100000
      },
      {
        id: 2,
        name: "Tong Ve sinh 1",
        price: 100000
      },
      {
        id: 3,
        name: "Tong Ve sinh 2",
        price: 100000
      },
    ],
    total_money: 300000,
    is_paid: true,
    time_paid: "2021-09-08",
    employees: [
      {
        id: 123,
        name: "Nguyen Van B",
        phone: "0395077731"
      },
      {
        id: 123,
        name: "Nguyen Van B",
        phone: "0395077731"
      },
      {
        id: 123,
        name: "Nguyen Van B",
        phone: "0395077731"
      }
    ],
    status: {
      createDate: "2022-12-12 12:00",
      createBy: "Nguyen Van A",
      role: "Nhân viên",

    }

  }

  constructor(public dialogRef: MatDialogRef<DialogTaskDetailComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }

}
