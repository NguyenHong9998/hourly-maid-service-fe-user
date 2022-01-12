import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-employee',
  templateUrl: './dialog-create-employee.component.html',
  styleUrls: ['./dialog-create-employee.component.scss']
})
export class DialogCreateEmployeeComponent implements OnInit {
  infor: any = {
    role: "EMPLOYEE",
    avatar: null,
    name: "Nguyễn Thị Hồng",
    email: "nguyenhong19999@gmail.com",
    phone: "0395077731",
  }
  file!: File;
  avatar!: string | ArrayBuffer;
  roles: any = [
    { value: 'EMPLOYEE', viewValue: 'Nhân viên' },
    { value: 'MANAGER', viewValue: 'Quản lý' }
  ];
  selectedValue: string = "";

  constructor(public dialogRef: MatDialogRef<DialogCreateEmployeeComponent>,
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
    this.infor.avatar = null as any;
    this.file = null as any;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
