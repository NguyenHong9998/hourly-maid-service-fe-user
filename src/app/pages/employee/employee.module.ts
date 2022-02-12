import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInforModule } from '@pages/user/component/user-infor/user-infor.module';
import { PaginationComponent } from '@shell/ui/pagination/pagination.component';
import { MaterialExampleModule } from 'src/app/material.module';
import { EmployeeInforComponent } from './employee-infor/employee-infor.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';


@NgModule({
  declarations: [
    EmployeeComponent, PaginationComponent, EmployeeInforComponent,
  ],
  imports: [
    CommonModule, EmployeeRoutingModule, MaterialExampleModule, UserInforModule, FormsModule, ReactiveFormsModule
  ]
})
export class EmployeeModule { }
