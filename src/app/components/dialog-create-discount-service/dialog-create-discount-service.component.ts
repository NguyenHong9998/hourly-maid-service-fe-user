import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListSelectServiceDomain } from './service-list-domain';


@Component({
  selector: 'app-dialog-create-discount-service',
  templateUrl: './dialog-create-discount-service.component.html',
  styleUrls: ['./dialog-create-discount-service.component.scss']
})
export class DialogCreateDiscountServiceComponent implements OnInit {
  exampleForm: FormGroup | any;
  totalSum: number = 0;
  myFormValueChanges$: any;
  discount: any = {
    startDate: new FormControl(new Date()),
  }
  services = this.getListServices();
  constructor(public dialogRef: MatDialogRef<DialogCreateDiscountServiceComponent>,
    private formBuilder: FormBuilder,
  ) { }

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

  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }

  /**
   * Create form unit
   */
  private getUnit() {
    return this.formBuilder.group({
      unitName: [''],

      unitPercent: [''],
    });
  }

  /**
   * Add new unit row into form
   */
  addUnit() {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.push(this.getUnit());
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.removeAt(i);
  }

  /**
   * This is one of the way how clear units fields.
   */
  clearAllUnits() {
    const control = <FormArray>this.exampleForm.controls['units'];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }

  getListServices(): Array<ListSelectServiceDomain> {
    const service = Array<ListSelectServiceDomain>();
    for (let i = 1; i <= 10; i++) {
      const domain = new ListSelectServiceDomain(i,
        "Tổng vệ sinh", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        false);
      service.push(domain);
    }
    return service;
  }

}
