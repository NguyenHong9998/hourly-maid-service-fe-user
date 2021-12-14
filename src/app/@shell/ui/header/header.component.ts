import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  activeIndex: boolean;
  isLoggedIn = false;
  currentUser = "";
  avatar = "";
  userRole = "";
  isHover: boolean;

  path = ROUTER_UTILS.config;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.activeIndex = false;
    this.isHover = false;
    // this.isLoggedIn = authService.getToken() != null;
    // console.log("login: " + this.isLoggedIn);
    // console.log("access_token: " + this.authService.getToken())
  }


  ngOnInit(): void {
    this.loadHeader();
  }
  onClickSignOut(): void {
    console.log("log out");
    this.authService.signOut();
    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }

  onCLikSignIn(): void {
    console.log("log in");
    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }

  setActiveNumber() {
    this.activeIndex = !this.activeIndex;

  }

  loadHeader(): void {
    if (this.authService.getToken()) {
      this.currentUser = this.authService.getUser().username;
      this.userRole = this.authService.getUser().roles[0];
    }
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  setHover() {
    this.isHover = !this.isHover;
    console.log(this.isHover);
  }

}
