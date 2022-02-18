import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { DiscountServiceComponent } from './discount-service.component';
import { DiscountServiceRouting } from './discount-service.routing';



@NgModule({
  declarations: [
    DiscountServiceComponent
  ],
  imports: [
    CommonModule, DiscountServiceRouting, MaterialExampleModule, FormsModule, ReactiveFormsModule
  ]
})
export class DiscountServiceModule { }
