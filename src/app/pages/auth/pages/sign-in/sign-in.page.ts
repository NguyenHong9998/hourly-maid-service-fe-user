import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  returnUrl: string;
  error_message = '';
  loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl(''),
    remember_me: new FormControl(''),
  })
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || `${ROUTER_UTILS.config.base.home}`;
  }

  oncLickSignIn() {
    this.authService.signInHttp(this.loginForm.value).subscribe(res => {
      this.router.navigate([this.returnUrl]);
    })
  }

}
