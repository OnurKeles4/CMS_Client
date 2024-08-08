import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/order/create_order';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { ListOrder } from '../../../contracts/order/list_order';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
import { DatetableOrder } from '../../../contracts/order/datetable_order';
import { RegisterUser } from '../../../contracts/user/register_user';
import { LoginUser } from '../../../contracts/user/login_user';
import { DataService } from '../dataservice';
import { SignStatus } from '../../../ui/login/register/register/register.component';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClientService: HttpClientService,
    private dataService: DataService
  ) {}

  register(user: RegisterUser): Observable<RegisterUser> {
    var a = this.httpClientService.post<RegisterUser>(
      { controller: 'users/auth-register' },
      user
    );

    return a;
  }
  login(email: string, password: string): Observable<LoginUser> {
    var a = this.httpClientService.post<LoginUser>(
      { controller: 'users/auth-login' },
      { Email: email, Password: password }
    );
    return a;
  }

  refresh(refreshToken: any) {
    var a = this.httpClientService.post<RegisterUser>(
      { controller: 'users/auth/refresh-token' },
      refreshToken
    );
    return a;
  }
}
