import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListCustomer } from '../../contracts/customer/list_customer';
import { ListOrder } from '../../contracts/order/list_order';
import { ModalConfig, ModalInstance } from '@siemens/ix';

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

  private filterData = new BehaviorSubject<number>(0);
  filterDataObs = this.filterData.asObservable();
  private customerId = new BehaviorSubject<string>("");
  customerIdObs = this.customerId.asObservable();

  private customer = new BehaviorSubject<ListCustomer>(null);
  customerObs = this.customer.asObservable();
  private order = new BehaviorSubject<ListOrder>(null);
  orderObs = this.order.asObservable();


  setData(data?: boolean) {
     //console.log("data has been set");
     //console.log(data);
     //console.log(this.dataObs);
    
    this.data.next(data);
  }
  setFilterData(data: number) {
    //console.log("AAAAAAAAAAAAAAAAAAAA");
    
    this.filterData.next(data);
  }
  setCustomerId(data: string) {
    //console.log("AAAAAAAAAAAAAAAAAAAA");
    
    this.customerId.next(data);
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