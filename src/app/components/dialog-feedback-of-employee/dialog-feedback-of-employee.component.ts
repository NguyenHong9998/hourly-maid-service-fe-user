import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-feedback-of-employee',
  templateUrl: './dialog-feedback-of-employee.component.html',
  styleUrls: ['./dialog-feedback-of-employee.component.scss']
})
export class DialogFeedbackOfEmployeeComponent implements OnInit {
  title: any;
  constructor(public dialogRef: MatDialogRef<DialogFeedbackOfEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.elementName;
   }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
