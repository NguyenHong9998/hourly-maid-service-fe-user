import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-service',
  templateUrl: './dialog-create-service.component.html',
  styleUrls: ['./dialog-create-service.component.scss']
})
export class DialogCreateServiceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCreateServiceComponent>,
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  file!: File;
  avatar!: string | ArrayBuffer;


  onFileChange(event: any) {
    console.log("Change avatar");
    this.file = event.target.files[0] || null;
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.avatar = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.avatar = this.avatar;
    }
  }

  onRemoveAvatar() {
    this.avatar = null as any;
    this.file = null as any;
  }

}
