import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListCustomer } from '../../contracts/customer/list_customer';
import { ListOrder } from '../../contracts/order/list_order';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new BehaviorSubject(false);
  dataObs = this.data.asObservable();
  private refresh = new BehaviorSubject(false);
  refreshObs = this.refresh.asObservable();
  private isDisabled = new BehaviorSubject(true);
  isDisabledObs = this.isDisabled.asObservable();

  private customer = new BehaviorSubject<ListCustomer>(null);
  customerObs = this.customer.asObservable();
  private order = new BehaviorSubject<ListOrder>(null);
  orderObs = this.order.asObservable();


  setData(data: boolean) {
     //console.log("data has been set");
     //console.log(data);
     //console.log(this.dataObs);
    
    this.data.next(data);
  }

  setisDisabled(data: boolean) {
    //console.log("AAAAAAAAAAAAAAAAAAAA");
    
    this.isDisabled.next(data);
  }
  
  setRefresh(data: boolean) {
    //console.log("refresh has been set");
    
   this.refresh.next(data);
 }

 setCustomer(data: ListCustomer) {
  console.log("data has been set");
  //console.log(data);
  //console.log(this.dataObs);
 
 this.customer.next(data);
}
setOrder(data: ListOrder) {
  //console.log("data has been set");
  //console.log(data);
  //console.log(this.dataObs);
 
 this.order.next(data);
}
}