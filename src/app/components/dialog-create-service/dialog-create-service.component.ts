import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-create-service',
  templateUrl: './dialog-create-service.component.html',
  styleUrls: ['./dialog-create-service.component.scss']
})
export class DialogCreateServiceComponent implements OnInit {

  serviceForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    note: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<DialogCreateServiceComponent>,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  file!: File;
  banner!: string | ArrayBuffer;


  onFileChange(event: any) {
    this.file = event.target.files[0] || null;
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.banner = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.banner = this.banner;
    }
  }

  onRemoveAvatar() {
    this.banner = null as any;
    this.file = null as any;
  }

  onSaveService() {
    let banner = this.banner as string;
    const formData = new FormData();
    formData.append('file', this.file);
    if (banner && !banner.startsWith('http')) {
      this.http.post(environment.apiUrl + "/cloud/upload-avatar", formData).subscribe(data => {
        console.log(data);
        this.banner = (data as any).data;
        let body = {
          banner: this.banner,
          name: this.serviceForm.get('name')?.value,
          note: this.serviceForm.get('note')?.value,
          price: this.serviceForm.get('price')?.value
        }
        this.http.post(environment.apiUrl + "/service", body).subscribe(data => {
          this.customSnackbarService.success("Tạo mới dịch vụ thành công!");
          this.dialogRef.close();

        })
      })
    } else {
      let body = {
        banner: this.banner,
        name: this.serviceForm.get('name')?.value,
        note: this.serviceForm.get('note')?.value,
        price: this.serviceForm.get('price')?.value
      }
      this.http.post(environment.apiUrl + "/service", body).subscribe(data => {
        this.customSnackbarService.success("Tạo mới dịch vụ thành công!");
        this.dialogRef.close();
      })
    }
  }

}
