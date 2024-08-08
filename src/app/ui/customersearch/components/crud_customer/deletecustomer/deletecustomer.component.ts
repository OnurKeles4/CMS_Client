import { Component, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../services/common/dataservice';
import { CustomerService } from '../../../../../services/common/models/customer.service';
import { OrderService } from '../../../../../services/common/models/order.service';
import { ListCustomer } from '../../../../../contracts/customer/list_customer';
import { ListOrder } from '../../../../../contracts/order/list_order';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';

@Component({
  selector: 'app-deletecustomer',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './deletecustomer.component.html',
  styleUrl: './deletecustomer.component.scss',
})
export class DeletecustomerComponent {
  label: string = 'Remove';

  icon = faRemove;

  subscription: any;
  isDisabled: boolean = true;

  selectedCustomer: ListCustomer;
  selectedOrder: ListOrder;

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

    this.subscription = this.dataService.customerObs.subscribe((data) => {
      this.selectedCustomer = data;
    });
  }

  async deleteSelectedCustomer() {
    if (this.isDisabled != true) {
      this.dataService.setisDisabled(true);
      this.dataService.setRefresh(true);
      //console.log('Delete Selected in Delete, id:', this.selectedCustomer.id);

      await this.customerService.delete(this.selectedCustomer.id).then(() => {
        //console.log('Deleted a customer');
        //Put the button on waiting mode
        this.dataService.setRefresh(false);
        //Refresh the data on the customerinfo
        this.dataService.setMessageBar({
          message: 'Customer deleted successfully!',
          type: 'info',
          duration: 3000,
        });
        this.dataService.setData(false);
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
}
