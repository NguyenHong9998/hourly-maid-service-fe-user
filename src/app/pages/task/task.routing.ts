import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { TaskComponent } from './task.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.task.list,
        component: TaskComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRouting { }
