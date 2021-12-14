import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialExampleModule } from 'src/app/material.module';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { UserInforComponent } from './component/user-infor/user-infor.component';
import { MyProfilePage } from './pages/my-profile/my-profile.page';
import { OverviewPage } from './pages/overview/overview.page';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [MyProfilePage, OverviewPage, SidebarComponent, UserInforComponent],
  imports: [CommonModule, UserRoutingModule, MaterialExampleModule],
})
export class UserModule { }
