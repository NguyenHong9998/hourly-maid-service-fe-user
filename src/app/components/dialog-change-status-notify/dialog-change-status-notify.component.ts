import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-change-status-notify',
  templateUrl: './dialog-change-status-notify.component.html',
  styleUrls: ['./dialog-change-status-notify.component.scss']
})
export class DialogChangeStatusNotifyComponent implements OnInit {

  notifyId !: number;
  constructor(public dialogRef: MatDialogRef<DialogChangeStatusNotifyComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService) {
    this.notifyId = data.notifyId;
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onChangeStatus() {
    const params = {
      id: this.notifyId
    }
    this.http.put(environment.apiUrl + "/notify/change-status", params).subscribe(data => {
      this.customSnackbarService.success("Cập nhật thành công thành công")
      this.dialogRef.close();
    })
  }
}
