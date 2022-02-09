import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
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
  notifyForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  })
  date !: string;
  status !: string;

  selectedType = '';
  constructor(public dialogRef: MatDialogRef<DialogEditNotifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public http: HttpClient, public customSnackbarService: CustomSnackbarService) {
      // this.status = data.notifyStatus;
      // console.log("xxxxxx: afdsfs " + this.status);
  }

  ngOnInit(): void {
    const notifyId = this.data.notifyId;
    this.getData(notifyId);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getData(id: number) {
    this.http.get(environment.apiUrl + "/notify/" + id).subscribe(data => {
      this.notifyForm.get('title')?.setValue((data as any).data.title);
      this.notifyForm.get('content')?.setValue((data as any).data.content);
      this.selectedType = (data as any).data.type;
      this.date = (data as any).data.publish_date;
      this.status = (data as any).data.status;
      console.log(this.status);

    })
  }

  editNotify(){
    const data = {
      title: this.notifyForm.get('title')?.value,
      content: this.notifyForm.get('content')?.value,
      type: this.selectedType
    }
    this.http.put(environment.apiUrl + "/notify/" + this.data.notifyId,  data).subscribe(data => {
      this.customSnackbarService.success("Cập nhật thành công")
      this.dialogRef.close();
    })
  }
}
