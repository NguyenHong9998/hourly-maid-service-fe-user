import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifyComponent } from '@pages/user/pages/notify/notify.component';
import { MaterialExampleModule } from 'src/app/material.module';

@NgModule({
    declarations: [
        NotifyComponent
    ],
    imports: [
        CommonModule, , MaterialExampleModule
    ]
})
export class NotifyModule { }
