import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceDiscount } from '@components/dialog-create-discount-service/dialog-create-discount-service.component';
import { ListSelectServiceDomain } from '@components/dialog-create-discount-service/service-list-domain';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { format } from 'date-fns';
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
  services !: Array<ListSelectServiceDomain>;
  discountInform !: EditDiscountServiceListDomain;
  formArray: FormArray | any;
  discountForm = new FormGroup({
    name: new FormControl(''),
    note: new FormControl(''),
    start: new FormControl(new Date()),
    end: new FormControl(new Date())
  })
  status !: string;

  constructor(public dialogRef: MatDialogRef<DialogEditDiscountServiceComponent>,
    private formBuilder: FormBuilder, public http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, public customSnackbarService: CustomSnackbarService) {
      this.status = data.status;
  }

  ngOnInit(): void {

    this.exampleForm = this.formBuilder.group({
      units: this.formBuilder.array([
        // this.getUnit(),
      ]),
    });
    this.myFormValueChanges$ = this.exampleForm.controls['units'].valueChanges;

    this.getListService();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  file!: File;
  banner!: string | ArrayBuffer;


  onFileChange(event: any) {
    console.log("Change avatar");
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
      this.getDiscountInform();
    }

  }

  getDiscountInform() {
    const control = <FormArray>this.exampleForm.controls['units'];

    this.http.get(environment.apiUrl + '/discount/' + this.data.discountId).subscribe((data: any) => {
      const name = data.data.title;
      const note = data.data.note;
      this.banner = data.data.banner;
      const startDate = data.data.start_time;
      const endDate = data.data.end_time;
      const services = data.data.service_list;
      for (let i = 0; i < services.length; i++) {
        let prevElement = this.services.find(x => x.name === services[i].name);
        if (prevElement) {
          prevElement.isSelect = true;
          control.push(this.formBuilder.group({
            unitName: [services[i].name],

            unitPercent: [services[i].percentage],
          }));
        }
      }
      this.discountForm.get('name')?.setValue(name);
      this.discountForm.get('note')?.setValue(note);
      this.discountForm.get('start')?.setValue(new Date(startDate));
      this.discountForm.get('end')?.setValue(new Date(endDate));

    })
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
        this.http.put(environment.apiUrl + "/discount/" + this.data.discountId, body).subscribe(data => {
          this.customSnackbarService.success("Cập nhật thành công!");
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
      this.http.put(environment.apiUrl + "/discount/" + this.data.discountId, body).subscribe(data => {
        this.customSnackbarService.success("Cập nhật thành công!");
        this.dialogRef.close();

      })
    }
  }
}
