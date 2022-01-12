import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListEmployeeCreateTaskDomain } from './employee-list-domain';
import { ListSelectServiceTaskDomain } from './service-list-domain';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss']
})
export class DialogCreateTaskComponent implements OnInit {
  firstFormGroup: FormGroup | any;
  secondFormGroup: FormGroup | any;
  service = new FormControl();
  serviceList = this.getListService();
  selectedService: any;

  file!: File;
  type_addresss: any = [
    {
      code: 1,
      name: "Địa chỉ nhà"
    },
    {
      code: 2,
      name: "Địa chỉ công ty"

    }
    ,
    {
      code: 3,
      name: "Địa chỉ nhà nghỉ, khách sạn"

    }
    ,
    {
      code: 4,
      name: "Địa chỉ công trường"

    }

  ];


  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: [''],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: [''],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }


  getListEmployee(): Array<ListEmployeeCreateTaskDomain> {
    const employee = Array<ListEmployeeCreateTaskDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new ListEmployeeCreateTaskDomain(i,
        "Nguyễn Thi A", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        false);
      employee.push(domain);
    }
    return employee;
  }

  getListService() {
    const service = Array<ListSelectServiceTaskDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new ListSelectServiceTaskDomain(i,
        "Tổng vệ sinh", "https://vesinhcongnghiepbluesky.com.vn/wp-content/uploads/2016/07/DICH-VU-CHUYEN-NGHIEP.png",
        false);
      service.push(domain);
    }
    return service;
  }

}
