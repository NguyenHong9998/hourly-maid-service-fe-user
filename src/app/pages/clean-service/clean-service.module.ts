import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { CleanServiceComponent } from './clean-service.component';
import { CleanServiceRouting } from './clean-service.routing';


@NgModule({
    declarations: [
        CleanServiceComponent
    ],
    imports: [
        CommonModule, CleanServiceRouting, MaterialExampleModule, FormsModule, ReactiveFormsModule
    ]
})
export class CleanServiceModule { }
