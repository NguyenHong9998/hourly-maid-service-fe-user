import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialExampleModule } from 'src/app/material.module';
import { CalendarComponent } from './calendar.component';
import { CalendarRouting } from './calendar.routing';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule, CalendarRouting, MaterialExampleModule
  ]
})
export class CalendarModule { }
