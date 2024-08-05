import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/order/create_order';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { ListOrder } from '../../../contracts/order/list_order';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
import { DatetableOrder } from '../../../contracts/order/datetable_order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  dataloaded: boolean = false;
  constructor(private httpClientService: HttpClientService) { }

  
  async create(order: CreateOrder, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {

  this.httpClientService.post({controller: "orders"}, order)
  .subscribe(result => {},(errorResponse: HttpErrorResponse) => {
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
    
    var a = this.httpClientService.get<ListOrder[]>(
      {controller: "orders"});
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }
  async readLastMonth(FilterDays: number): Promise<Observable<ListOrder[]>> {
    
    var a = this.httpClientService.getDays<ListOrder[]>(
      {controller: "orders"}, FilterDays);
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }

  async readStatusDaysCount(FilterDays: number, StatusType: string): Promise<Observable<DatetableOrder[]>> {
    
    var a = this.httpClientService.getStatusDaysCount<DatetableOrder[]>(
      {controller: "orders"}, FilterDays, StatusType);
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }
  
  async readDaysCount(FilterDays: number): Promise<Observable<DatetableOrder[]>> {
    
    var a = this.httpClientService.getDaysCount<DatetableOrder[]>(
      {controller: "orders"}, FilterDays);

    
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
    console.log("Update Selected in Service, order:", order);
    
    const updateObs: Observable<any> = this.httpClientService.put({
      controller: "orders"
    }, order)

    var a = await firstValueFrom(updateObs);

    return a;
  }

}
