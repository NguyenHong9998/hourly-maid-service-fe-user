import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditServiceDomain } from './edit-service.domain';

@Component({
  selector: 'app-dialog-edit-service',
  templateUrl: './dialog-edit-service.component.html',
  styleUrls: ['./dialog-edit-service.component.scss']
})
export class DialogEditServiceComponent implements OnInit {
  serviceName: string;
  serviceId: string;
  entity: EditServiceDomain;
  constructor(public dialogRef: MatDialogRef<DialogEditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.serviceName = data.serviceName;
    this.serviceId = data.serviceId;
    this.entity = this.getData(this.serviceId);
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  file!: File;
  avatar!: string | ArrayBuffer;


  onFileChange(event: any) {
    this.file = event.target.files[0] || null;
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.entity.banner = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.entity.banner = this.entity.banner;
    }
  }

  onRemoveAvatar() {
    this.entity.banner = null as any;
    this.file = null as any;
  }
  getData(serviceId: string) {
    const domain = new EditServiceDomain(123, "Tổng vệ sinh", "https://vesinhcongnghiepbluesky.com.vn/wp-content/uploads/2016/07/DICH-VU-CHUYEN-NGHIEP.png", "200000", "Bao gồm các việc,....");
    return domain;
  }
}
