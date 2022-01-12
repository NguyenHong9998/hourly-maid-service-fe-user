import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { ShareService } from '@pages/auth/services/share.service';
import { TokenStorageService } from '@pages/auth/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  activeIndex: number = 1;
  isLoggedIn: boolean = false;
  currentUser = "";
  avatar = "";
  userRole = "";
  path = ROUTER_UTILS.config;

  constructor(
    private router: Router,
    private shareService: ShareService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })

  }


  ngOnInit(): void {
    this.loadHeader();
  }
  onClickSignOut(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/');
    this.ngOnInit();
  }

  onCLikSignIn(): void {
    console.log("log in");
    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }

  setActiveNumber(number: any) {
    this.tokenStorageService.saveActiveIndexHeader(number);
    this.activeIndex = number;
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.tokenStorageService.getToken() != null;
    var indexActive = this.tokenStorageService.getActiveIndexHeader();
    this.activeIndex = indexActive;
    this.getUsernameAccount();
  }
  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().full_name;
    }
  }
}
