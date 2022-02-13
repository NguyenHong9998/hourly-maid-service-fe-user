import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-create-employee',
  templateUrl: './dialog-create-employee.component.html',
  styleUrls: ['./dialog-create-employee.component.scss']
})
export class DialogCreateEmployeeComponent implements OnInit {
  
  file!: File;
  avatar!: string | ArrayBuffer;

  employeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  roles: any = [
    { value: 'EMPLOYEE', viewValue: 'Nhân viên' },
    { value: 'MANAGER', viewValue: 'Quản lý' }
  ];
  selectedType = this.roles[0].viewValue;

  constructor(public dialogRef: MatDialogRef<DialogCreateEmployeeComponent>, public http: HttpClient, public customSnackbarService: CustomSnackbarService
  ) { }

  onFileChange(event: any) {
    console.log("Change avatar");
    this.file = event.target.files[0] || null;
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.avatar = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.avatar = this.avatar;
    }
  }

  onRemoveAvatar() {
    this.avatar = null as any;
    this.file = null as any;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateEmployee() {
    let avatar = this.avatar as string;
    const formData = new FormData();
    formData.append('file', this.file);
    if (avatar && !avatar.startsWith('http')) {
      this.http.post(environment.apiUrl + "/cloud/upload-avatar", formData).subscribe(data => {
        console.log(data);
        this.avatar = (data as any).data;
        let body = {
          avatar: this.avatar,
          role: this.selectedType,
          name: this.employeeForm.get('name')?.value,
          email: this.employeeForm.get('email')?.value,
          phone: this.employeeForm.get('phone')?.value
        }
        this.http.post(environment.apiUrl + "/user", body).subscribe(data => {
          this.customSnackbarService.success("Tạo mới nhân viên thành công!");
          this.dialogRef.close();

        })
      })
    } else {
      let body = {
        avatar: this.avatar,
        role: this.selectedType,
        name: this.employeeForm.get('name')?.value,
        email: this.employeeForm.get('email')?.value,
        phone: this.employeeForm.get('phone')?.value
      }
      this.http.post(environment.apiUrl + "/user", body).subscribe(data => {
        this.customSnackbarService.success("Tạo mới nhân viên thành công!");
        this.dialogRef.close();
      })
    }
  
  }
}
