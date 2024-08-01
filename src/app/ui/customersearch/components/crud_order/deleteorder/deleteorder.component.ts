import { Component, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../services/common/dataservice';
import { OrderService } from '../../../../../services/common/models/order.service';
import { ListOrder } from '../../../../../contracts/order/list_order';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { BasicbuttonComponent } from "../../../../common/basicbutton/basicbutton.component";
import { CustomerService } from '../../../../../services/common/models/customer.service';

@Component({
  selector: 'app-deleteorder',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './deleteorder.component.html',
  styleUrl: './deleteorder.component.scss'
})
export class DeleteorderComponent {
  label: string = 'Remove';
  
  icon = faRemove;
  
  subscription: any;
  isDisabled: boolean = true;

  selectedOrder: ListOrder;
  selectedCustomer: ListOrder;

  constructor(
    protected orderService: OrderService,
    protected customerService: CustomerService,
    private renderer: Renderer2,
    private dataService: DataService
  ) {
    this.subscription = this.dataService.isDisabledObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = data;
    });

    this.subscription = this.dataService.orderObs.subscribe((data) => {
      this.selectedOrder = data;
    });
    
  }

  async deleteSelectedOrder() {
    if (this.isDisabled != true) {
      this.sendisDisabled(true);
      this.sendRefreshRequest(true);
      console.log('Delete Selected in Delete, id:', this.selectedOrder.id);

      await this.orderService.delete(this.selectedOrder.id).then(() => {
        console.log('Deleted a order');
        //Put the button on waiting mode
        this.sendRefreshRequest(false);
        //Refresh the data on the orderinfo
        this.sendData(false);
      });
    } else {
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
