import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, setItem, StorageItem } from '@core/utils';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  constructor(private http: HttpClient) {

  }
  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  signInHttp(loginForm: any) {
    console.log(loginForm);
    return this.http.post(environment.apiUrl + "/auth/login", loginForm).pipe(
      tap((result: any) => {
        setItem(StorageItem.Auth, result.data.access_token);
        this.isLoggedIn$.next(true)
      })
    )
  }


  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveTokenLocal(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    if (localStorage.getItem(TOKEN_KEY) !== null) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  public saveUserLocal(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveUserSession(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    if (localStorage.getItem(USER_KEY) !== null) {
      const user = localStorage.getItem(USER_KEY);
      return JSON.parse(user == null ? "" : user);
    } else {
      const user = sessionStorage.getItem(USER_KEY);
      return JSON.parse(user == null ? "" : user);
    }
  }

}
