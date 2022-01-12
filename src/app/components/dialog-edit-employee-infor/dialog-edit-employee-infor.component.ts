import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-employee-infor',
  templateUrl: './dialog-edit-employee-infor.component.html',
  styleUrls: ['./dialog-edit-employee-infor.component.scss']
})
export class DialogEditEmployeeInforComponent implements OnInit {
  infor: any = {
    role: "EMPLOYEE",
    status: "Hoạt động",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    name: "Nguyễn Thị Hồng",
    gender: "Nữ",
    email: "nguyenhong19999@gmail.com",
    phone: "0395077731",
    dateOfBirth: new FormControl(new Date("2014-10-10")),
    idCard: "044199001383",
    address: "K1/127 Ngô Sĩ Liên, Hòa Khánh, Liên Chiểu, Đà Nẵng",
    experience: [
      {
        name: "Tổng vệ sinh",
        note: "Bao gồm các công việc như lau chùi nhà, quét rác, dọn phòng,.",
        hasExperience: true
      },
      {
        name: "Tổng vệ sinh",
        note: "Bao gồm các công việc như lau chùi nhà, quét rác, dọn phòng,.",
        hasExperience: true
      },
    ]
  }
  file!: File;
  avatar!: string | ArrayBuffer;
  constructor(public dialogRef: MatDialogRef<DialogEditEmployeeInforComponent>,
  ) { }

  onFileChange(event: any) {
    console.log("Change avatar");
    this.file = event.target.files[0] || null;
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.infor.avatar = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.infor.avatar = this.infor.avatar;
    }
  }

  onRemoveAvatar() {
    this.infor.avatar = "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png";
    this.file = null as any;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
