import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialExampleModule } from 'src/app/material.module';
import { UserCalendarComponent } from './user-calendar.component';

@NgModule({
    declarations: [UserCalendarComponent],
    imports: [CommonModule, MaterialExampleModule],
    exports: [UserCalendarComponent]
})
export class UserCalendarModule { }
