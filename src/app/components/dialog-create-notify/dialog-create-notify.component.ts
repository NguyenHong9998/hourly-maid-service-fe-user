import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Type {
  code: number;
  name: string;
}

@Component({
  selector: 'app-dialog-create-notify',
  templateUrl: './dialog-create-notify.component.html',
  styleUrls: ['./dialog-create-notify.component.scss']
})

export class DialogCreateNotifyComponent implements OnInit {

  types : Type[] = [
    {
      code: 1,
      name : "Nhân viên"
    }
    ,
    {
      code : 2,
      name : "Khách hàng"
    },

    {
      code : 3,
      name : "Tất cả"
    }
  ]
  constructor(public dialogRef: MatDialogRef<DialogCreateNotifyComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
