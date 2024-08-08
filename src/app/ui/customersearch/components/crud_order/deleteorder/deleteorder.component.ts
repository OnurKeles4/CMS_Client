import { Component, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../services/common/dataservice';
import { OrderService } from '../../../../../services/common/models/order.service';
import { ListOrder } from '../../../../../contracts/order/list_order';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { CustomerService } from '../../../../../services/common/models/customer.service';
// import { AlertifyService, MessageType, Position } from '../../../../common/message/alerfity.service';

@Component({
  selector: 'app-deleteorder',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './deleteorder.component.html',
  styleUrl: './deleteorder.component.scss',
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
    // private alertify: AlertifyService,
    private dataService: DataService
  ) {
    this.subscription = this.dataService.orderIsDisabledObs.subscribe(
      (data) => {
        //console.log('Data has been set', data);

        this.isDisabled = data;
      }
    );

    this.subscription = this.dataService.orderObs.subscribe((data) => {
      //console.log('aaaaa', data);

      this.selectedOrder = data;
    });
  }

  async deleteSelectedOrder() {
    if (this.isDisabled != true) {
      this.dataService.setorderIsDisabled(true);
      this.sendRefreshRequest(true);
      //console.log('Delete Selected in Delete, id:', this.selectedOrder.id);

      await this.orderService.delete(this.selectedOrder.id).then(() => {
        //console.log('Deleted a order');
        this.dataService.setMessageBar({
          message: 'Order removed successfully!',
          type: 'info',
          duration: 3000,
        });
        this.sendRefreshRequest(false);
        //Refresh the data on the orderinfo
        this.dataService.setorderIsDisabled(true);
      });
    } else {
      this.dataService.setMessageBar({
        message: 'Button is disabled!',
        type: 'warning',
        duration: 3000,
      });
      //console.log('the button is disabled');
    }
  }

  sendRefreshRequest(flag: boolean) {
    //console.log('Send Refresh Request in Delete being sent');
    this.dataService.setRefresh(flag);
    this.dataService.setorderRefresh(flag);
  }
}
