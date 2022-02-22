import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { TaskComponent } from './task.component';
import { TaskRouting } from './task.routing';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule, TaskRouting, MaterialExampleModule, FormsModule, ReactiveFormsModule
  ]
})
export class TaskModule { }
