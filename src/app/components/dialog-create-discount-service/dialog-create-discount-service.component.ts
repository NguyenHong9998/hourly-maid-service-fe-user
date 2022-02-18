import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { format } from 'date-fns';
import { ListSelectServiceDomain } from './service-list-domain';

export class ServiceDiscount {
  name: string;
  percentage: string;

  constructor(serviceName: string,
    percent: string) {
    this.name = serviceName;
    this.percentage = percent;
  }
}

@Component({
  selector: 'app-dialog-create-discount-service',
  templateUrl: './dialog-create-discount-service.component.html',
  styleUrls: ['./dialog-create-discount-service.component.scss']
})
export class DialogCreateDiscountServiceComponent implements OnInit {
  exampleForm: FormGroup | any;
  totalSum: number = 0;
  myFormValueChanges$: any;
  formArray: FormArray | any;
  // discount: any = {
  //   startDate: new FormControl(new Date()),
  // }

  discountForm = new FormGroup({
    name: new FormControl(''),
    note: new FormControl(''),
    start: new FormControl(new Date()),
    end: new FormControl(new Date())
  })

  services !: Array<ListSelectServiceDomain>;
  constructor(public dialogRef: MatDialogRef<DialogCreateDiscountServiceComponent>, public http: HttpClient, public customSnackbarService: CustomSnackbarService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getListService();
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

  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }

  private getUnit() {
    return this.formBuilder.group({
      unitName: [''],

      unitPercent: [''],
    });
  }

  addUnit() {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.push(this.getUnit());
  }

  removeUnit(i: number) {
    const control = <FormArray>this.exampleForm.controls['units'];
    let prevElement = this.services.find(x => x.name === control.at(i)?.get('unitName')?.value);
    if (prevElement) {
      prevElement.isSelect = false;
    }
    control.removeAt(i);
  }

  clearAllUnits() {
    const control = <FormArray>this.exampleForm.controls['units'];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    this.services = this.services.map(item => {
      item.isSelect = false;
      return item;
    })
    control.push(this.getUnit());
  }

  onSave() {
    const startTime = format(this.discountForm.get('start')?.value, "yyyy-MM-dd HH:mm:ss");
    const endTime = format(this.discountForm.get('end')?.value, "yyyy-MM-dd HH:mm:ss");
    const name = this.discountForm.get('name')?.value;
    const note = this.discountForm.get('note')?.value;

    const array = new Array<ServiceDiscount>();
    const control = <FormArray>this.exampleForm.controls['units'];

    for (let i = 0; i < control.length; i++) {
      const serviceName = control.at(i)?.get('unitName')?.value;
      const percent = control.at(i)?.get('unitPercent')?.value;
      const item = new ServiceDiscount(serviceName, percent);
      array.push(item);
    }

    let banner = this.banner as string;
    const formData = new FormData();
    formData.append('file', this.file);
    if (banner && !banner.startsWith('http')) {
      this.http.post(environment.apiUrl + "/cloud/upload-avatar", formData).subscribe(data => {
        console.log(data);
        this.banner = (data as any).data;
        let body = {
          banner: this.banner,
          service_list: array,
          start_time: startTime,
          end_time: endTime,
          note: note,
          title: name,
        }
        this.http.post(environment.apiUrl + "/discount", body).subscribe(data => {
          this.customSnackbarService.success("Tạo mới chương trình giảm giá thành công!");
          this.dialogRef.close();

        })
      })
    } else {
      let body = {
        banner: this.banner,
        service_list: array,
        start_time: startTime,
        end_time: endTime,
        note: note,
        title: name,
      }
      this.http.post(environment.apiUrl + "/discount", body).subscribe(data => {
        this.customSnackbarService.success("Tạo mới chương trình giảm giá thành công!");
        this.dialogRef.close();
      })
    }

  }


  getListService() {

    let params = new HttpParams()
      .set('offset', 0)
      .set('limit', 1000)
      .set('status', '')
      .set('value_search', '')
      .set('column_sort', '')
      .set('type_sort', '');

    this.http.get(environment.apiUrl + "/service", { params: params })
      .subscribe((res: any) => {
        this._prepareNotifyList(res.data);
      }
      );

  }

  _prepareNotifyList(data: any) {
    if (data) {
      const result = Array<ListSelectServiceDomain>();
      for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const name = data[i].name;
        const banner = data[i].banner;
        const domain = new ListSelectServiceDomain(id, name, banner, false);

        result.push(domain);
      }
      this.services = result;
      console.log(this.services);
    }
  }

  assignValue(i: any, item: ListSelectServiceDomain) {
    const control = <FormArray>this.exampleForm.controls['units'];
    let prevElement = this.services.find(x => x.name === control.at(i)?.get('unitName')?.value);
    if (prevElement) {
      prevElement.isSelect = false;
    }

    control.at(i)?.get('unitName')?.setValue(item.name);
    let element = this.services.find(x => x.id === item.id);
    if (element) {
      element.isSelect = true;
    }
  }

}
