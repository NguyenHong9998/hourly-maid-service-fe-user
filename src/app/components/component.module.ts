import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from "./snack-bar/snack-bar.component";


@NgModule({
    declarations: [
        SnackBarComponent,

    ],
    imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
    ],
})
export class ShareModule { }