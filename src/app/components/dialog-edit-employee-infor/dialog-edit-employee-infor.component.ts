import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import { TokenStorageService } from '@pages/auth/services/token-storage.service';
export class EployeeService {
  serviceId: number;
  serviceName: string;
  level: number;


  constructor(serviceId: number,
    serviceName: string,
    level: number) {
    this.serviceId = serviceId;
    this.serviceName = serviceName;
    this.level = level;
  }
}
@Component({
  selector: 'app-dialog-edit-employee-infor',
  templateUrl: './dialog-edit-employee-infor.component.html',
  styleUrls: ['./dialog-edit-employee-infor.component.scss']
})
export class DialogEditEmployeeInforComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];

  role: string = "";
  status: string = "";

  file!: File;
  avatar!: string | ArrayBuffer;
  personalInform = new FormGroup({
    email: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl(''),
    idCard: new FormControl(''),
    address: new FormControl(''),
    dateOfBirth: new FormControl(new Date()),
    name: new FormControl(''),

  })

  experiences: any;

  constructor(public dialogRef: MatDialogRef<DialogEditEmployeeInforComponent>,
    public http: HttpClient, public customSnackbarService: CustomSnackbarService,
    public tokenStorageService: TokenStorageService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
    this.avatar = "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png";
    this.file = null as any;
  }
  onItemChange(event: any) {
    this.personalInform.get('gender')?.setValue(event.target.value);
  }
  onRoleChange(event: any) {
    this.role = event.target.value;
  }
  ngOnInit(): void {
    this.getUserCommonInform(this.data.employeeId);
    this.getUserPersonalInform(this.data.employeeId);
    this.getListExperiences();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getUserCommonInform(id: number) {

    this.http.get(environment.apiUrl + "/user/common-inform/" + id).subscribe(data => {

      let avatar = (data as any).data.avatar;
      if (avatar == null) {
        avatar = "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png";
      }
      this.role = (data as any).data.role;
      this.status = (data as any).data.status;
      this.avatar = avatar;
    })
  }

  getUserPersonalInform(id: number) {
    this.http.get(environment.apiUrl + "/user/personal-inform/" + id).subscribe(data => {
      this.personalInform.get('email')?.setValue((data as any).data.email);
      this.personalInform.get('gender')?.setValue((data as any).data.gender);
      this.personalInform.get('phone')?.setValue((data as any).data.phone);
      this.personalInform.get('idCard')?.setValue((data as any).data.id_card);
      this.personalInform.get('address')?.setValue((data as any).data.address);
      let birthday = (data as any).data.date_of_birth == "" ? new Date() : new Date((data as any).data.date_of_birth);
      this.personalInform.get('dateOfBirth')?.setValue(birthday);
      this.personalInform.get('name')?.setValue((data as any).data.name);
    })

  }

  saveCommonInform() {
    let avatar = this.avatar as string;
    const formData = new FormData();
    formData.append('file', this.file);
    if (!avatar.startsWith('http')) {
      this.http.post(environment.apiUrl + "/cloud/upload-avatar", formData).subscribe(data => {
        this.avatar = (data as any).data;
        let body = {
          avatar: this.avatar,
          role: this.role,
          status: this.status
        }
        this.http.put(environment.apiUrl + "/user/common-inform/" + this.data.employeeId, body).subscribe(data => {
          this.customSnackbarService.success("Cập nhật thành công!")
        })
      })
    } else {
      let body = {
        avatar: this.avatar,
        role: this.role,
        status: this.status
      }
      this.http.put(environment.apiUrl + "/user/common-inform/" + this.data.employeeId, body).subscribe(data => {
        this.customSnackbarService.success("Cập nhật thành công!")
      })
    }

  }

  saveUserPersonalInform() {
    const data = {
      email: this.personalInform.get('email')?.value,
      gender: this.personalInform.get('gender')?.value,
      phone: this.personalInform.get('phone')?.value,
      id_card: this.personalInform.get('idCard')?.value,
      address: this.personalInform.get('address')?.value,
      date_of_birth: this.personalInform.get('dateOfBirth')?.value.value,
      name: this.personalInform.get('name')?.value
    }

    this.http.put(environment.apiUrl + "/user/personal-inform/" + this.data.employeeId, data).subscribe(data => {
      this.customSnackbarService.success("Cập nhật thành công!")
    })
  }

  getListExperiences() {
    this.http.get(environment.apiUrl + "/user/experience/" + this.data.employeeId).subscribe(data => {
      const result = Array<EployeeService>();
      for (let i = 0; i < (data as any).length; i++) {
        const item = new EployeeService((data as any).service_id, (data as any).service_name, (data as any).level);
        result.push(item)
      }
      this.experiences = result;
    });
  }

}
