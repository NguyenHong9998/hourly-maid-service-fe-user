import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyEntity } from './notify.domain';
interface Type {
  code: number;
  name: string;
}


@Component({
  selector: 'app-dialod-edit-notify',
  templateUrl: './dialod-edit-notify.component.html',
  styleUrls: ['./dialod-edit-notify.component.scss']
})
export class DialogEditNotifyComponent implements OnInit {
  types: Type[] = [
    {
      code: 1,
      name: "Nhân viên"
    }
    ,
    {
      code: 2,
      name: "Khách hàng"
    },

    {
      code: 3,
      name: "Tất cả"
    }
  ];
  title: string;
  notifyId: string;
  entity: NotifyEntity;
  constructor(public dialogRef: MatDialogRef<DialogEditNotifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.notifyId = data.notifyId;
    this.entity = this.getData(this.notifyId);

  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getData(id: string) {
    return new NotifyEntity(
      123,
    "Thông báo về thêm dịch vụ mới",
    "Thêm dịch vụ tổng vệ sinh",
    1
    );

  }
}
