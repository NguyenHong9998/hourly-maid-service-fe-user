import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-done-task',
  templateUrl: './dialog-done-task.component.html',
  styleUrls: ['./dialog-done-task.component.scss']
})
export class DialogDoneTaskComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDoneTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
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
  this.http.put(environment.apiUrl + "/task/mark-done", data).subscribe(data =>{
    this.customSnackbarService.success("Cập nhật thành công")
    this.dialogRef.close({isChange: true});
  })
}

}
