import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { CalendarsComponent } from './calendar.component';

const routes: Routes = [
    {
        path: ROUTER_UTILS.config.calendar.list,
        component: CalendarsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalendarRouting { }
