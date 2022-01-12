import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { DiscountServiceComponent } from './discount-service.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.discount_service.list,
        component: DiscountServiceComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DiscountServiceRouting { }
