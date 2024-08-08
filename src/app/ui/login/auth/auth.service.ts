import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClientService } from '../../../services/common/http-client.service';
import { LoginService } from '../../../services/common/models/login.service';
import { RegisterUser } from '../../../contracts/user/register_user';
import { log } from 'node:console';
import { DataService } from '../../../services/common/dataservice';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  private router = inject(Router) 
  constructor(private loginService: LoginService) {}

  login(user: { email: string; password: string }): Observable<any> {
    
    return this.loginService.login(user.email, user.password)
    .pipe(tap((data: any) => this.doLoginUser(user.email, JSON.stringify(data))));
  }
  register(user: RegisterUser) : Observable<any> {
    console.log('Registering user', user);
    
    return this.loginService.register(user);
  }

  doLoginUser(email: string, tokens: any) {
    //console.log('Logged in', email);
    //console.log('Tokens', tokens);
        
    this.loggedUser = email;
    this.storeJwtToken(tokens);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    //this.loggedUser = null;
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }


  isTokenExpired() {
  const tokens = localStorage.getItem(this.JWT_TOKEN);
      if(!tokens) return true;
     const token = JSON.parse(tokens).access_token; 
    const decoded = jwtDecode(token);
    if(!decoded.exp) return true;
    const expirationTime = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationTime < now;
  }

  //Does my API has a refresh token?
  refreshToken() {
    let tokens : any = localStorage.getItem(this.JWT_TOKEN); 
    if(!tokens) return "sad";
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.loginService.refresh(refreshToken)
    .pipe(tap((data: any) => this.storeJwtToken(JSON.stringify(data))));
  }
}
