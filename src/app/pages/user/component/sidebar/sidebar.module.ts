import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialExampleModule } from 'src/app/material.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, MaterialExampleModule],
    exports: [SidebarComponent]
})
export class SidebarModule { }
