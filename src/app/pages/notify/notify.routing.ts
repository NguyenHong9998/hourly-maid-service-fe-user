import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { NotifyComponent } from './notify.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.notify.list,
        component: NotifyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotifyRouting { }
