import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { CalendarsComponent, HighlightedDatesComponent } from './calendar.component';
import { CalendarRouting } from './calendar.routing';




@NgModule({
  declarations: [
    HighlightedDatesComponent, CalendarsComponent, 
  ],
  imports: [
    CommonModule, CalendarRouting, MaterialExampleModule, FormsModule, ReactiveFormsModule
  
  ], 
  providers: []

})
export class CalendarsModule { }
