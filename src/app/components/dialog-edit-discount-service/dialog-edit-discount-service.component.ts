import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditDiscountServiceDomain } from './edit-discount-service-domain';
import { EditDiscountServiceListDomain } from './edit-discount.domain';

@Component({
  selector: 'app-dialog-edit-discount-service',
  templateUrl: './dialog-edit-discount-service.component.html',
  styleUrls: ['./dialog-edit-discount-service.component.scss']
})
export class DialogEditDiscountServiceComponent implements OnInit {

  exampleForm: FormGroup | any;
  totalSum: number = 0;
  myFormValueChanges$: any;

  services = this.getListServices();

  discountInform = this.getDiscountInform(123);
  startDate = new FormControl(new Date());

  endDate = new FormControl(new Date());


  constructor(public dialogRef: MatDialogRef<DialogEditDiscountServiceComponent>,
    private formBuilder: FormBuilder,
  ) {



  }

  ngOnInit(): void {
    this.exampleForm = this.formBuilder.group({
      units: this.formBuilder.array([
        this.getUnit(),
      ]),
    });
    this.myFormValueChanges$ = this.exampleForm.controls['units'].valueChanges;
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
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }


  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }

  private getUnit() {

    return this.formBuilder.group({
      unitName: [],

      unitPercent: [],
    });
  }

  addUnit() {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.push(this.getUnit());
  }

  convertServiceAsArray(array: Array<EditDiscountServiceDomain>) {
    const control = <FormArray>this.exampleForm.controls['units'];

    array.forEach(obj => {
      if (obj.isSelect) {
        control.push(this.formBuilder.group({
          unitName: obj.name,
          unitPercent: obj.percent
        }))
      }
    })

    console.log(control);
    return control;

  }


  removeUnit(i: number) {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.removeAt(i);
  }

  clearAllUnits() {
    const control = <FormArray>this.exampleForm.controls['units'];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }

  getListServices(): Array<EditDiscountServiceDomain> {
    const service = Array<EditDiscountServiceDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new EditDiscountServiceDomain(i,
        "Tổng vệ sinh", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        false, 0);
      service.push(domain);
    }
    return service;
  }


  getDiscountInform(discountId: any) {
    const inform = new EditDiscountServiceListDomain(
      123,
      123,
      "Khuyến mãi tết",
      "Về nhà đón tết",
      "https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/01/10040532/201807120816_banner-bai-viet-ctkm-hung-tuy-1511235823.jpg",
      "2021-09-08 12:30",
      "2021-09-08 12:30",
      '', 1
    );


    return inform;

  }

}
