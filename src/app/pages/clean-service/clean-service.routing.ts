import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { CleanServiceComponent } from './clean-service.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.clean_service.list,
        component: CleanServiceComponent,
    },

    // {
    //     path: ROUTER_UTILS.config.employee.information,
    //     component: EmployeeInforComponent,
    // },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CleanServiceRouting { }
