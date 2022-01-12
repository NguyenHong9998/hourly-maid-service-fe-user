import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MaterialExampleModule } from "../material.module";
import { DialogCreateDiscountServiceComponent } from './dialog-create-discount-service/dialog-create-discount-service.component';
import { DialogCreateEmployeeComponent } from './dialog-create-employee/dialog-create-employee.component';
import { DialogCreateServiceComponent } from './dialog-create-service/dialog-create-service.component';
import { DialogEditDiscountServiceComponent } from './dialog-edit-discount-service/dialog-edit-discount-service.component';
import { DialogEditEmployeeInforComponent } from './dialog-edit-employee-infor/dialog-edit-employee-infor.component';
import { DialogEditServiceComponent } from './dialog-edit-service/dialog-edit-service.component';
import { DialogListDiscountServiceComponent } from './dialog-list-discount-service/dialog-list-discount-service.component';
import { DialogListEmployeeServiceComponent } from './dialog-list-employee-service/dialog-list-employee-service.component';
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { DialogCreateTaskComponent } from './dialog-create-task/dialog-create-task.component';
import { DialogTaskDetailComponent } from './dialog-task-detail/dialog-task-detail.component';


@NgModule({
    declarations: [
        SnackBarComponent,
        DialogListEmployeeServiceComponent,
        DialogCreateEmployeeComponent,
        DialogCreateServiceComponent,
        DialogEditServiceComponent,
        DialogEditEmployeeInforComponent,
        DialogListDiscountServiceComponent,
        DialogEditDiscountServiceComponent,
        DialogCreateDiscountServiceComponent,
        DialogCreateTaskComponent,
        DialogTaskDetailComponent,
    ],
    imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
        MaterialExampleModule,
        FormsModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
})
export class ShareModule { }