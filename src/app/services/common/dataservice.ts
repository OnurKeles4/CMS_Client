import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListCustomer } from '../../contracts/customer/list_customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new BehaviorSubject(false);
  dataObs = this.data.asObservable();
  private refresh = new BehaviorSubject(false);
  refreshObs = this.refresh.asObservable();

  private customer = new BehaviorSubject<ListCustomer>(null);
  customerObs = this.customer.asObservable();


  setData(data: boolean) {
     //console.log("data has been set");
     //console.log(data);
     //console.log(this.dataObs);
    
    this.data.next(data);
  }

  
  setRefresh(data: boolean) {
    //console.log("refresh has been set");
    
   this.refresh.next(data);
 }

 setCustomer(data: ListCustomer) {
  //console.log("data has been set");
  //console.log(data);
  //console.log(this.dataObs);
 
 this.customer.next(data);
}
}