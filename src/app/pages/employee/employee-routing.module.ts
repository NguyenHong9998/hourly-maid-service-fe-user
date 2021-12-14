import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { EmployeeInforComponent } from './employee-infor/employee-infor.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.employee.list,
        component: EmployeeComponent,
    },

    {
        path: ROUTER_UTILS.config.employee.information,
        component: EmployeeInforComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule { }
