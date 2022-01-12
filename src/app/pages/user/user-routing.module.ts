import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { CalendarPage } from './pages/calendar/calendar.page';
import { MyProfilePage } from './pages/my-profile/my-profile.page';
import { OverviewPage } from './pages/overview/overview.page';

const routes: Routes = [
  { path: ROUTER_UTILS.config.user.profile, component: MyProfilePage },
  { path: ROUTER_UTILS.config.user.overview, component: OverviewPage },
  { path: ROUTER_UTILS.config.user.calendar, component: CalendarPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
