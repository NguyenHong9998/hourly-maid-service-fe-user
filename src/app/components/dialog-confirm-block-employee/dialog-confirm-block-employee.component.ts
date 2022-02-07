import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class EmployeeInform {
  id: number;
  avatar: string;
  name: string;
  status: string;

  constructor(id: number ,avatar: string,
    name: string,
    status: string) {
    this.id = id;
    this.avatar = avatar;
    this.name = name;
    this.status = status

  }
}
@Component({
  selector: 'app-dialog-confirm-block-employee',
  templateUrl: './dialog-confirm-block-employee.component.html',
  styleUrls: ['./dialog-confirm-block-employee.component.scss']
})

export class DialogConfirmBlockEmployeeComponent implements OnInit {
  employee: EmployeeInform;
  statusForm = new FormControl();
  constructor(public dialogRef: MatDialogRef<DialogConfirmBlockEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee = new EmployeeInform(data.employeeId, data.elementAvatar, data.elementName, data.elementStatus);
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
