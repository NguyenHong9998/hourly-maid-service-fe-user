import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { NotifyComponent } from '@pages/user/pages/notify/notify.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.notify.root,
        component: NotifyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotifykRouting { }
