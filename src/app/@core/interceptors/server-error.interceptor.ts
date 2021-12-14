import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';
import { CustomSnackbarService } from '@pages/auth/services/custom-snackbar.service';
import isArray from 'lodash-es/isArray';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CodeError } from 'src/app/constant/error-code';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    public snackbarService: CustomSnackbarService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        let errorMessage = '';
        let status = 0;
        let codeError = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          status = error.status;
          if (status === 500) {
            errorMessage = 'Lỗi hệ thống';
          } else {
            if (isArray(error.error.errors)) {
              codeError = error.error.errors[0].code;
              errorMessage = error.error.errors[0].default_message;
            } else {
              codeError = error.error.errors.code;
              errorMessage = error.error.errors.default_message;
            }
          }
          this.handleCodeError(codeError);
        }
        this.snackbarService.warning(errorMessage, status);
        return throwError(errorMessage);
      })
    );
  }

  handleCodeError(codeError: string) {
    switch (codeError) {
      case CodeError.TokenInvalid:
        this.redirectToLogin();
        break;
      default:
        break;
    }
  }

  private redirectToLogin() {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }

}
