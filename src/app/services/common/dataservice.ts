import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListCustomer } from '../../contracts/customer/list_customer';
import { ListOrder } from '../../contracts/order/list_order';
import { ModalConfig, ModalInstance } from '@siemens/ix';
import { MessageOptions } from '../../ui/common/message/message.component';
import { SignStatus } from '../../ui/login/register/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = new BehaviorSubject(false);
  dataObs = this.data.asObservable();
  private refresh = new BehaviorSubject(false);
  refreshObs = this.refresh.asObservable();
  private isDisabled = new BehaviorSubject(true);
  isDisabledObs = this.isDisabled.asObservable();

  private didLogin = new BehaviorSubject(true);
  didLoginObs = this.didLogin.asObservable();

  private didSign = new BehaviorSubject<SignStatus>(null);
  didSignObs = this.didSign.asObservable();

  private orderRefresh = new BehaviorSubject(false);
  orderRefreshObs = this.orderRefresh.asObservable();
  private orderIsDisabled = new BehaviorSubject(true);
  orderIsDisabledObs = this.orderIsDisabled.asObservable();

  private filterData = new BehaviorSubject<number>(0);
  filterDataObs = this.filterData.asObservable();
  private customerId = new BehaviorSubject<string>('');
  customerIdObs = this.customerId.asObservable();
  private orderId = new BehaviorSubject<string>('');
  orderIdObs = this.orderId.asObservable();
  private messageBar = new BehaviorSubject<MessageOptions>(null);
  messageBarObs = this.messageBar.asObservable();

  private customer = new BehaviorSubject<ListCustomer>(null);
  customerObs = this.customer.asObservable();
  private order = new BehaviorSubject<ListOrder>(null);
  orderObs = this.order.asObservable();
  

  constructor() {
    //this.setInitial();
  }

  setInitial() {
    this.setisDisabled(true);
    this.setDidLogin(true);
    this.setMessageBar(null);
    this.setCustomer(null);
    this.setorderIsDisabled(true);
  }

  setDidLogin(data?: boolean) {
    this.didLogin.next(data);
  }
  setDidSign(data?: SignStatus) {
    this.didSign.next(data);
  }
  setData(data?: boolean) {
    //console.log('data has been set');
    //console.log(data);
    //console.log(this.dataObs);

    this.data.next(data);
  }
  setFilterData(data: number) {
    //console.log('AAAAAAAAAAAAAAAAAAAA');

    this.filterData.next(data);
  }
  setCustomerId(data: string) {
    //console.log('AAAAAAAAAAAAAAAAAAAA');

    this.customerId.next(data);
  }
  setMessageBar(data: MessageOptions) {
    this.messageBar.next(data);
  }
  setisDisabled(data: boolean) {
    //console.log('AAAAAAAAAAAAAAAAAAAA');

    this.isDisabled.next(data);
  }

  setRefresh(data: boolean) {
    //console.log('refresh has been set');

    this.refresh.next(data);
  }

  setorderIsDisabled(data: boolean) {
    //console.log('AAAAAAAAAAAAAAAAAAAA');

    this.orderIsDisabled.next(data);
  }

  setorderRefresh(data: boolean) {
    //console.log('refresh has been set');

    this.orderRefresh.next(data);
  }

  setCustomer(data: ListCustomer) {
    //console.log('data has been set');
    //console.log(data);
    //console.log(this.dataObs);

    this.customer.next(data);
  }
  setOrder(data: ListOrder) {
    //console.log('data has been set');
    //console.log(data);
    //console.log(this.dataObs);

    this.order.next(data);
  }
  setOrderId(data: string) {
    //console.log('data has been set');
    //console.log(data);
    //console.log(this.dataObs);

    this.orderId.next(data);
  }
}
