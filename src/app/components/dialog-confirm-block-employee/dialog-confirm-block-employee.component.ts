import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
export class EmployeeInform {
  id: number;
  avatar: string;
  name: string;
  status: string;

  constructor(id: number, avatar: string,
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
  status !: string;
  constructor(public dialogRef: MatDialogRef<DialogConfirmBlockEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService) {
    this.employee = new EmployeeInform(data.employeeId, data.elementAvatar, data.elementName, data.elementStatus);
    this.status = data.elementStatus;
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  checkCheckBoxvalue(event: any) {
    this.status = event.target.value;
  }

  onChangeStatus() {
    const data = {
      id: this.data.employeeId,
      status: this.status
    }
    this.http.put(environment.apiUrl + "/user/change-status", data).subscribe(data =>{
      this.customSnackbarService.success("Cập nhật trạng thái thành công")
      this.dialogRef.close();
    })
  }

}
