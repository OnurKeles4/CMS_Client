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
import { RegisterStatus } from '../../../ui/login/register/register/register.component';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  dataloaded: boolean = false;
  constructor(private httpClientService: HttpClientService, private dataService: DataService) { }

  
  async create(user: RegisterUser) {
  let message = "";
    this.httpClientService.post({controller: "users/auth-register"}, user)
  .subscribe(result => {},(errorResponse: HttpErrorResponse) => {
  const _error: Array<{ key: string, value: Array<string>}> = errorResponse.error;
    console.log("error", _error);
    console.log("qwewdzcvwqgwfew");
    
  message = _error.toString();
  
  _error.forEach((v, index) => {
    v.value.forEach((_v, _index) => {
      message += `${_v}<br>`;
    });
  });

  
}).add(() => {
  console.log("response should be completed", message);
  if(message.length == 0) {
    this.dataService.setDidRegister(RegisterStatus.success);
  }
  else {
    this.dataService.setDidRegister(RegisterStatus.failed);
  }

  
});
}


    /*
    Try to mask the updated date and created date with more similar text such as: 2024-07-12, 23:54 or smth
    */
   login(email: string, password: string): Observable<LoginUser> {
    
    var a = this.httpClientService.post<LoginUser>(
      {controller: "users/auth-login"}, {Email: email, Password: password}
        );
        console.log("login", a);
        
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }
  
}
