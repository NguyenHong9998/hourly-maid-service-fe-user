import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';
import { TokenStorageService } from '@pages/auth/services/token-storage.service';
import { ROUTER_UTILS } from '../utils/router.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService, private tokenService: TokenStorageService) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isLoggedIn = this.tokenService.getToken() != null;
    console.log("LOGGGGGG: " + isLoggedIn);
    if (isLoggedIn) {
      return true;
    }

    const returnUrl = segments.map((s) => s.path).join('/');

    const { root, signIn } = ROUTER_UTILS.config.auth;

    this.router.navigate(['/', root, signIn], {
      queryParams: { returnUrl },
    });

    return false;
  }
}
