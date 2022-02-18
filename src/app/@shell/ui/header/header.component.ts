import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { environment } from '@env/environment';
import { AuthService } from '@pages/auth/services/auth.service';
import { ShareService } from '@pages/auth/services/share.service';
import { TokenStorageService } from '@pages/auth/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeIndex: number = 1;
  isLoggedIn: boolean = false;
  currentUser = "";
  avatar !: string;
  userRole = "";
  path = ROUTER_UTILS.config;

  constructor(
    private router: Router,
    private shareService: ShareService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef, private http: HttpClient
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
    this.authService.isLoggedIn$.subscribe(res => {
      console.log(res);
      this.isLoggedIn = res;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
  }
  onClickSignOut(): void {
    this.tokenStorageService.signOut();
    this.authService.isLoggedIn$.next(false);
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  onCLikSignIn(): void {
    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }

  onCLikSignUp() {
    const { root, signUp } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signUp]);
  }

  onClickProfile(): void {
    const { root, profile } = ROUTER_UTILS.config.user;
    this.router.navigate(['/', root, profile]);
  }

  setActiveNumber(number: any) {
    this.tokenStorageService.saveActiveIndexHeader(number);
    this.activeIndex = number;
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;

      this.http.get(environment.apiUrl + "/user/common-inform").subscribe(data => {
        let avatar = (data as any).data.avatar;
        console.log("Avatarrrrr: " + avatar);
        this.avatar = avatar;
      })
    }
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
