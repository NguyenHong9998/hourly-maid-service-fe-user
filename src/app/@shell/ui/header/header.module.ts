import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from 'src/app/material.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MaterialExampleModule],
  exports: [HeaderComponent],
})
export class HeaderModule { }
