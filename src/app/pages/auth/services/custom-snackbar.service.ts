import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  autoHide = 5000;

  constructor(public snackbar: MatSnackBar, public zone: NgZone) { }

  public openSnackBar(status: any, message: string, pannelClass: string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      horizontalPosition: 'right',
      verticalPosition: this.verticalPosition,
      duration: this.autoHide,
      panelClass: [pannelClass],
      data: {
        status, message
      }
    });
  }

  public success(message: string) {
    this.openSnackBar('200', message, 'pannel-snack-success');
  }

  public warning(message: string, status: string | number = '400') {
    this.openSnackBar(status, message, 'pannel-snack-error');
  }
}
