import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from '@components/component.module';
import { AuthModule } from '@pages/auth/auth.module';
import { EmployeeModule } from '@pages/employee/employee.module';
import { WebShellModule } from '@shell/ft/web-shell.module';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { MaterialExampleModule } from './material.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    WebShellModule,
    AuthModule,
    HttpClientModule,
    ShareModule,
    EmployeeModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
