import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-change-status-discount',
  templateUrl: './dialog-change-status-discount.component.html',
  styleUrls: ['./dialog-change-status-discount.component.scss']
})
export class DialogChangeStatusDiscountComponent implements OnInit {

  discountId !: number;
  isChange!: boolean;
  isCome !: boolean;
  constructor(public dialogRef: MatDialogRef<DialogChangeStatusDiscountComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService) {
    this.discountId = data.discountId;
    this.isChange = data.isChange;
    this.isCome = data.isCome;
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close({
      isChange: false
    });
  }
  onChangeStatus() {
    const params = {
      id: this.discountId
    }
    this.http.put(environment.apiUrl + "/discount/change-status", params).subscribe(data => {
      this.customSnackbarService.success("Cập nhật thành công thành công")
      this.dialogRef.close({
        isChange: true
      });
    })
  }
}
