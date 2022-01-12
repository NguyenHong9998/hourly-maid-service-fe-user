import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { UserInforComponent } from './user-infor.component';

@NgModule({
    declarations: [UserInforComponent],
    imports: [CommonModule, MaterialExampleModule, FormsModule, ReactiveFormsModule],

    exports: [UserInforComponent]
})
export class UserInforModule { }
