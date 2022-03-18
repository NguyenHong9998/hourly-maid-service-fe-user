import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';

@Component({
  selector: 'app-dialog-edit-service',
  templateUrl: './dialog-edit-service.component.html',
  styleUrls: ['./dialog-edit-service.component.scss']
})
export class DialogEditServiceComponent implements OnInit {
  serviceName: string;
  serviceId: string;


  serviceForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    note: new FormControl(''),
    advantage: new FormControl(''),
    introduce: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<DialogEditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService

  ) {
    this.serviceName = data.serviceName;
    this.serviceId = data.serviceId;
  }

  ngOnInit(): void {
    this.getData(this.data.serviceId);
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

  getData(serviceId: string) {
    this.http.get(environment.apiUrl + "/service/" + serviceId).subscribe(data => {
      this.serviceForm.get('name')?.setValue((data as any).data.name);
      this.serviceForm.get('note')?.setValue((data as any).data.note);
      this.serviceForm.get('price')?.setValue((data as any).data.price);
      this.serviceForm.get('introduce')?.setValue((data as any).data.introduces);
      this.serviceForm.get('advantage')?.setValue((data as any).data.advantage);
      this.banner = (data as any).data.banner;
    })
  }
  onEditService() {
    const formData = new FormData();
    formData.append('file', this.file);

    if (!(this.banner as string).startsWith('http')) {
      this.http.post(environment.apiUrl + "/cloud/upload-avatar", formData).subscribe(data => {
        this.banner = (data as any).data;
        let body = {
          name: this.serviceForm.get('name')?.value,
          note: this.serviceForm.get('note')?.value,
          price: this.serviceForm.get('price')?.value,
          advantage : this.serviceForm.get('advantage')?.value,
          introduces : this.serviceForm.get('introduce')?.value,
          banner: this.banner
        }
        this.http.put(environment.apiUrl + "/service/" + this.data.serviceId, body).subscribe(data => {
          this.customSnackbarService.success("Cập nhật thành công")
          this.dialogRef.close();
        })
      })
    } else {
      const data = {
        name: this.serviceForm.get('name')?.value,
        note: this.serviceForm.get('note')?.value,
        price: this.serviceForm.get('price')?.value,
        advantage : this.serviceForm.get('advantage')?.value,
        introduces : this.serviceForm.get('introduce')?.value,
        banner: this.banner
      }
      this.http.put(environment.apiUrl + "/service/" + this.data.serviceId, data).subscribe(data => {
        this.customSnackbarService.success("Cập nhật thành công")
        this.dialogRef.close();
      })
    }

  }
}
