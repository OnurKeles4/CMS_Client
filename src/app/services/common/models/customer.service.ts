import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateCustomer } from '../../../contracts/customer/create_customer';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { ListCustomer } from '../../../contracts/customer/list_customer';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  dataloaded: boolean = false;
  constructor(private httpClientService: HttpClientService) { }

  create(customer: CreateCustomer, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {

  this.httpClientService.post({controller: "customers"}, customer)
  .subscribe(result => {successCallBack();

  },(errorResponse: HttpErrorResponse) => {
  const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;

  let message = "";
  
  _error.forEach((v, index) => {
    v.value.forEach((_v, _index) => {
      message += `${_v}<br>`;
    });
  });
  if(errorCallBack)
    errorCallBack(message);   
});  
}


    /*
    Try to mask the updated date and created date with more similar text such as: 2024-07-12, 23:54 or smth
    */
   read(): Observable<ListCustomer[]> {
    
    var a = this.httpClientService.get<ListCustomer[]>({
      controller: "customers"
    });
    return a;



  }

  
  async readWithId(id: string): Promise<Observable<ListCustomer[]>> {
    //console.log("start read with Id");
    
    const readIdObs: Observable<any> = this.httpClientService.get<ListCustomer[]>({
      controller: "customers"
    }, id);

    
    var a = await firstValueFrom(readIdObs);
    //console.log(a);
    return a;


     // return a;

  }

  async delete(id: string) {
    //console.log("Delete Selected in Service, id:", id);
    
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "customers"
    }, id);
    //console.log("rweqe",a);
    
    var a = await firstValueFrom(deleteObservable);
  }

  async update(customer: ListCustomer): Promise<void> {
    //console.log("Update Selected in Service, customer:", customer);
    
    const updateObs: Observable<any> = this.httpClientService.put({
      controller: "customers"
    }, customer)

    var a = await firstValueFrom(updateObs);

    return a;
  }

}
