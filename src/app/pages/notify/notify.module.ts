import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { NotifyComponent } from './notify.component';
import { NotifyRouting } from './notify.routing';

@NgModule({
    declarations: [
        NotifyComponent 
      ],
      imports: [
        CommonModule, NotifyRouting, MaterialExampleModule, FormsModule, ReactiveFormsModule
      ]
})
export class NotifyModule { }
