import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { format } from 'date-fns';
import { ListEmployeeCreateTaskDomain } from './employee-list-domain';
import { ListSelectServiceTaskDomain } from './service-list-domain';

export class PriceList {
  serviceName !: string;
  servicePrice !: string;
  discountAply !: string;
  percentAply !: string;
  hours !: string;
  price !: string;

  constructor(serviceName: string, servicePrice: string, discountAply: string, percentAply: string, hours: string, price: string) {
    this.serviceName = serviceName;
    this.servicePrice = servicePrice;
    this.discountAply = discountAply;
    this.percentAply = percentAply;
    this.hours = hours;
    this.price = price;
  }
}
@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss']
})
export class DialogCreateTaskComponent implements OnInit {
  customerPhone = "";
  customerName = "";
  address = "";
  email = "";
  date = new FormControl(new Date());
  startTime = format(new Date(), "HH:mm");
  endTime = format(new Date(), "HH:mm");
  note = "";
  validTime: boolean = true;
  minDate = new Date();

  service = new FormControl();
  serviceList: Array<ListSelectServiceTaskDomain> = [];
  selectedService: any = [];
  isExistClient: boolean = true;
  disableNext: boolean = false;
  checkbox: boolean = false;
  dataSource !: MatTableDataSource<PriceList>;
  priceList: Array<PriceList> = [];
  numberOfemployee: number = 1;

  availableEmployee: boolean = true;

  totalMoney !: number;

  @ViewChild("stepper", { static: false }) stepper!: MatStepper;


  type_addresss: any = [
    {
      code: 1,
      name: "Địa chỉ nhà",
      icon: "home"
    },
    {
      code: 2,
      name: "Địa chỉ công ty",
      icon: "business"
    }
    ,
    {
      code: 3,
      name: "Địa chỉ nhà nghỉ, khách sạn",
      icon: "hotel"
    }
    ,
    {
      code: 4,
      name: "Địa chỉ công trường",
      icon: "golf_course"
    }

  ];
  displayedColumns: string[] = ['service', 'service_price', 'hours', 'discount', 'percent', 'price'];

  icon = this.type_addresss[0].icon;
  tooltip = this.type_addresss[0].name;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private formBuilder: FormBuilder, public http: HttpClient, public snackbar: CustomSnackbarService
  ) {

  }

  ngOnInit(): void {
    this.getListServices();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setIcon(item: any) {
    const element = this.type_addresss.find((x: any) => x.code == item);
    this.icon = element.icon;
    this.tooltip = element.name;
  }

  changeIcon() {
    this.trigger.menuClosed.subscribe(() => this.icon = 'more_ver');
    this.trigger.menuOpened.subscribe(() => this.icon = 'close');
  }
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  }

  onNext() {
    this.checkPriceList();
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


  getListServices() {

    let params = new HttpParams()
      .set('offset', 0)
      .set('limit', 1000)
      .set('status', 'Đã cung cấp')
      .set('value_search', '')
      .set('column_sort', '')
      .set('type_sort', '');

    this.http.get(environment.apiUrl + "/service", { params: params })
      .subscribe((res: any) => {
        this._prepareServiceList(res.data);
      }
      );

  }

  _prepareServiceList(data: any) {
    if (data) {
      console.log(data);
      const result = Array<ListSelectServiceTaskDomain>();
      for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const name = data[i].name;
        const banner = data[i].banner;
        const price = data[i].price;
        const domain = new ListSelectServiceTaskDomain(id, name, banner, false, price);

        result.push(domain);
      }
      this.serviceList = result;
    }
  }

  getCustomerInform() {
    let params = new HttpParams()
      .set('phone', this.customerPhone)
      .set('email', this.email)
    this.http.get(environment.apiUrl + "/client/check", { params: params }).subscribe((data: any) => {
      if (!data.data) {
        this.isExistClient = false;
        this.customerName = '';
        this.customerPhone = '';
        this.disableNext = true;
      } else {
        this.isExistClient = true;
        this.customerName = data.data.full_name;
        this.customerPhone = data.data.phone;
        this.disableNext = false;
      }
    })
  }

  onChangeCheckbox(event: MatCheckboxChange) {
    if (event.checked) {
      this.disableNext = false;
    }
  }

  onChangeEnd() {
    const start = format(this.date.value, "yyyy-MM-dd") + " " + this.startTime + ":00";
    const end = format(this.date.value, "yyyy-MM-dd") + " " + this.endTime + ":00";
    const newDate = format(new Date(), "yyyy-MM-dd") + " 00:00:00";
    if (new Date(start).getTime() - new Date(newDate).getTime() >= 360000 && new Date(end).getTime() - new Date(start).getTime() >= 360000) {
      this.validTime = false;
    } else {
      this.validTime = true;
    }
  }

  isOptionDisabled(opt: any) {
    return this.selectedService.length >= 1 && !this.selectedService.find((el: any) => el.id == opt.id)
  }

  onChange() {
    this.onChangeEnd();
    const start = format(this.date.value, "yyyy-MM-dd") + " " + this.startTime + ":00";
    const end = format(this.date.value, "yyyy-MM-dd") + " " + this.endTime + ":00";
    const serviceId = this.selectedService[0].id;
    let params = new HttpParams()
      .set('start_time', start)
      .set('end_time', end)
      .set('service_id', serviceId)
    this.http.get(environment.apiUrl + "/task/check-employee", { params: params }).subscribe((data: any) => {
      const list = data.data;
      this.availableEmployee = list.length >=1 ? true : false;
    })

  }

  checkPriceList() {
    const start = format(new Date(), "yyyy-MM-dd") + " " + this.startTime + ":00";
    const end = format(new Date(), "yyyy-MM-dd") + " " + this.endTime + ":00";
    const serviceIds = this.selectedService.map((x: any) => x.id);
    const body = {
      service_id: serviceIds,
      start_time: start,
      end_time: end,
      num_of_employee: this.numberOfemployee
    }
    this.http.post(environment.apiUrl + "/task/check-task", body).subscribe((data: any) => {
      const array = new Array<PriceList>();
      console.log(data);
      const list = data.data.price_list;
      for (let i = 0; i < list.length; i++) {
        const serviceName = list[i].service_name;
        const servicePrice = list[i].service_price;
        const discountAply = list[i].discount_apply == null ? "" : list[i].discount_apply;
        const percentAply = list[i].percent_apply == null ? "0.00" : list[i].percent_apply;
        const hours = list[i].hours;
        const price = list[i].price;
        const item = new PriceList(serviceName, servicePrice, discountAply, percentAply, hours, price);
        array.push(item);
      }
      const total = array.map(t => t.price as unknown as number).reduce((acc, value) => acc + value, 0);
      this.totalMoney = data.data.total;
      array.push(new PriceList("Tổng cộng", "(VNĐ/h)", "", "(%)", "", data.data.total + "(VNĐ)"));
      this.priceList = array;
      this.dataSource = new MatTableDataSource<PriceList>(this.priceList);
      this.stepper.next();
    })
  }

  getTotalMoney() {
    return this.numberOfemployee * this.totalMoney;
  }

  onCreateTask() {
    const start = format(this.date.value, "yyyy-MM-dd") + " " + this.startTime + ":00";
    const end = format(this.date.value, "yyyy-MM-dd") + " " + this.endTime + ":00";
    const serviceIds = this.selectedService.map((x: any) => x.id);
    const body = {
      email: this.email,
      phone: this.customerPhone,
      address: this.address,
      user_name: this.customerName,
      service_id: serviceIds,
      start_time: start,
      end_time: end,
      num_of_employee: this.numberOfemployee,
      note : this.note
    }
    this.http.post(environment.apiUrl + "/task", body).subscribe((data) => {
      this.snackbar.success("Tạo mới thành công");
      this.stepper.next();
    })
  }

  
}
