import { Injectable } from '@angular/core';
import { StorageItem } from '@core/utils';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveTokenLocal(token: string) {
    localStorage.removeItem(StorageItem.Auth);
    localStorage.setItem(StorageItem.Auth, token);

  }

  public saveRoleLocal(role : any){
    localStorage.removeItem(StorageItem.Role);
    localStorage.setItem(StorageItem.Role, role);
  }

  public saveTokenSession(token: string) {
    sessionStorage.removeItem(StorageItem.Auth);
    sessionStorage.setItem(StorageItem.Auth, token);
  }

  public getToken(): any {
    if (localStorage.getItem(StorageItem.Auth) !== null) {
      return localStorage.getItem(StorageItem.Auth);
    } else {
      return sessionStorage.getItem(StorageItem.Auth);
    }
  }

  public saveUserLocal(user: any) {
    localStorage.removeItem(StorageItem.User);
    localStorage.setItem(StorageItem.User, JSON.stringify(user));
  }
  public saveUserSession(user: any) {
    localStorage.removeItem(StorageItem.User);
    localStorage.setItem(StorageItem.User, JSON.stringify(user));
  }

  public getUser() {
    if (localStorage.getItem(StorageItem.User) !== null) {
      return JSON.parse(localStorage.getItem(StorageItem.User) || '{}');
    } else {
      return JSON.parse(sessionStorage.getItem(StorageItem.User) || '{}');
    }
  }

  public saveActiveIndexHeader(number: any) {
    localStorage.removeItem(StorageItem.HeaderINdex);
    localStorage.setItem(StorageItem.HeaderINdex, number);
  }
  public getActiveIndexHeader(): any {
    if (localStorage.getItem(StorageItem.HeaderINdex) !== null) {
      return localStorage.getItem(StorageItem.HeaderINdex);
    } else {
      return 1;
    }
  }
}
