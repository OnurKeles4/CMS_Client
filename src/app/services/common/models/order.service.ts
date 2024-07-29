import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/order/create_order';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { ListOrder } from '../../../contracts/order/list_order';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  dataloaded: boolean = false;
  constructor(private httpClientService: HttpClientService) { }

  //When you create an order, at the moment you need to have customer name and customer id. Make it so that you should send a body rather than normal parameters
  //create(order: CreateOrder, customer_id: string,customer_name: string,successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {

  this.httpClientService.post({controller: "orders"}, order, customer_id, customer_name)
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
   read(): Observable<ListOrder[]> {
    
    var a = this.httpClientService.get<ListOrder[]>({
      controller: "orders"
    });
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }
    //Consider making it async
  async readWithId(id: string): Promise<Observable<ListOrder[]>> {
    //console.log("start read with Id");
    
    const readIdObs: Observable<any> = this.httpClientService.get<ListOrder[]>({
      controller: "orders"
    }, id);
    //console.log("obs read with Id");
     //console.log(a);
    
    var a = await firstValueFrom(readIdObs);

    return a;


     // return a;

  }

  async delete(id: string) {
    //console.log("Delete Selected in Service, id:", id);
    
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "orders"
    }, id);
    //console.log("rweqe",a);
    
    var a = await firstValueFrom(deleteObservable);
  }

  async update(order: ListOrder): Promise<void> {
    //console.log("Update Selected in Service, order:", order);
    
    const updateObs: Observable<any> = this.httpClientService.put({
      controller: "orders"
    }, order)

    var a = await firstValueFrom(updateObs);

    return a;
  }

}
