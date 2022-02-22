import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-cancel-task',
  templateUrl: './dialog-cancel-task.component.html',
  styleUrls: ['./dialog-cancel-task.component.scss']
})
export class DialogCancelTaskComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogCancelTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onChangeStatus() {
    const data = {
      id: this.data.taskId,
    }
    this.http.put(environment.apiUrl + "/task/mark-cancel", data).subscribe(data =>{
      this.customSnackbarService.success("Huỷ công việc thành công")
      this.dialogRef.close({isChange: true});
    })
  }

}
