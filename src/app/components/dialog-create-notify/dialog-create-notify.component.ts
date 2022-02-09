import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

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

  types: Type[] = [

    {
      code: 1,
      name: "Tất cả"
    },
    {
      code: 2,
      name: "Nhân viên"
    }
    ,
    {
      code: 3,
      name: "Khách hàng"
    },

  ]
  notifyForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  })
  selectedType = this.types[0].name;


  constructor(public dialogRef: MatDialogRef<DialogCreateNotifyComponent>, public http: HttpClient, public customSnackbarService: CustomSnackbarService) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveNotify() {
    const data = {
      title: this.notifyForm.get('title')?.value,
      content: this.notifyForm.get('content')?.value,
      type: this.selectedType
    }

    this.http.post(environment.apiUrl + "/notify", data).subscribe(data => {
      this.customSnackbarService.success("Thêm mới thông báo thành công")
      this.dialogRef.close();
    })

  }

}
