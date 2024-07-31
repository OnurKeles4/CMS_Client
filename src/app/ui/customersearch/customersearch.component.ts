import { Component, Renderer2 } from '@angular/core';
import { CustomerinfoComponent } from "./components/customerinfo/customerinfo.component";
import { CustomerlistComponent } from "./components/customerlist/customerlist.component";
import { BasicbuttonComponent } from "../common/basicbutton/basicbutton.component";


import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faAdd} from '@fortawesome/free-solid-svg-icons'
import {faRemove} from '@fortawesome/free-solid-svg-icons'
import { DataService } from '../../services/common/dataservice';
import { OrderService } from '../../services/common/models/order.service';
import { CustomerService } from '../../services/common/models/customer.service';
import { ListCustomer } from '../../contracts/customer/list_customer';
import { ListOrder } from '../../contracts/order/list_order';
import { MessageComponent } from "../common/message/message.component";

@Component({
  selector: 'app-customersearch',
  standalone: true,
  imports: [CustomerinfoComponent, CustomerlistComponent, BasicbuttonComponent, MessageComponent],
  templateUrl: './customersearch.component.html',
  styleUrl: './customersearch.component.scss'
})
export class CustomerSearchComponent {


  labelAdd: string = 'Add';
  labelRemove: string = 'Remove';
  labelEdit: string = 'Edit';

  iconAdd = faAdd;
  iconRemove = faRemove;
  iconEdit = faEdit;
  subscription: any;
  isDisabled: boolean = true;

  selectedCustomer: ListCustomer;
  selectedOrder: ListOrder;


  constructor(
    protected orderService: OrderService,
    protected customerService: CustomerService,
    private renderer: Renderer2,
    private dataService: DataService) {
 this.subscription = this.dataService.isDisabledObs.subscribe(data => {
  //console.log('Data has been set', data);
  
      this.isDisabled = data;
    });

  this.subscription = this.dataService.customerObs.subscribe(data => {
    this.selectedCustomer = data;
  });
}

      //Don't forget the fact that when a customer has a order, the orders should be also deleted (before probably)!
  async deleteSelectedCustomer() {

    if(this.isDisabled != true) {
      this.sendisDisabled(true);
      this.sendRefreshRequest(true);
      console.log('Delete Selected in Delete, id:', this.selectedCustomer.id);

    await this.customerService.delete(this.selectedCustomer.id).then(
      () => {

      
        console.log('Deleted a customer');
        //this.sendData(false);
        this.sendRefreshRequest(false);
        //this.sendisDisabled(true);
        
      }
      
    );
  }
    else {
      //Doesn't work at the moment
      console.log('the button is disabled');
    }
  }
  sendisDisabled(flag: boolean) {
    this.dataService.setisDisabled(flag);
  }
  sendData(flag: boolean) {
    //console.log("SendData in Delete being sent");
    this.dataService.setData(flag);
  }
  
  sendRefreshRequest(flag: boolean) {
    console.log('Send Refresh Request in Delete being sent');
    this.dataService.setRefresh(flag);
  }


}
