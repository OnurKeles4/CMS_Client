import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import { OrderinputComponent } from '../../../dialogs/orderinput/orderinput.component';
import { OrderService } from '../../../../../services/common/models/order.service';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { ListOrder } from '../../../../../contracts/order/list_order';

@Component({
  selector: 'app-updateorder',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './updateorder.component.html',
  styleUrl: './updateorder.component.scss',
})
export class UpdateorderComponent {
  icon = faEdit;
  onOk = new EventEmitter();
  label: string = 'Update';
  @Output() messageEvent = new EventEmitter<boolean>();

  @Input() isDisabled: boolean = true;
  @Input() selectedOrder: ListOrder;
  //selectedOrderId: string;
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private orderService: OrderService
  ) {
    this.subscription = this.dataService.orderIsDisabledObs.subscribe(
      (data) => {
        console.log('Data has been set', data);

        this.isDisabled = data;
      }
    );
    this.subscription = this.dataService.orderObs.subscribe((data) => {
      console.log('Data has been set', data);

      this.selectedOrder = data;
    });
  }

  recieveMessage($event: boolean) {
    console.log('Recieved Message');
    this.isDisabled = $event;
    //this.selectedOrder = null;
  }

  public editSelected() {
    console.log('Edit Selected');
    this.isDisabled = true;
  }

  async openDialog() {
    if (this.isDisabled == false) {
      console.log('dialog is opening');

      const dialogRef = this.dialog.open(OrderinputComponent, {
        width: '300px',
        data: {
          title: 'Update Order',
          description: 'Update an order',
        },
      });

      /**
       *
       *
       *
       *
       *
       * PROBLEM IS PROBABLY RELATED TO LISTORDER, (the attributes of the data we send to database)
       */
      this.dataService.setRefresh(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          console.log('Dialog result:', result);
          console.log('result', result);
          console.log('selected Order', this.selectedOrder);

          const edit_order: any = await this.orderService.readWithId(
            this.selectedOrder.id
          );

          console.log('Edit Product:', edit_order);
          edit_order.name = result.input1
            ? result.input1
            : this.selectedOrder.name;
          edit_order.description = result.input2
            ? result.input2
            : this.selectedOrder.description;
          edit_order.address = result.input3
            ? result.input3
            : this.selectedOrder.address;
          edit_order.status = result.input4
            ? result.input4
            : this.selectedOrder.status;
          edit_order.customerId = this.selectedOrder.customerId;
          console.log('Edit order:', edit_order);

          await this.orderService.update(edit_order).then(() => {
            this.dataService.setMessageBar({
              message: 'Order updated successfully!',
              type: 'info',
              duration: 3000,
            });
            console.log('Updated a order');

            this.dataService.setorderRefresh(true);
          });
          console.log(
            'Edit Selected in Update, dataService.setData and refresh',
            this.dataService.setData
          );

          this.dataService.setData();
          //this.dataService.setRefresh(false);
        } else {
          this.dataService.setMessageBar({
            message: 'Order update cancelled!',
            type: 'danger',
            duration: 3000,
          });
        }

        this.dataService.setRefresh(false);
      });
    } else {
      this.dataService.setMessageBar({
        message: 'Button is disabled!',
        type: 'warning',
        duration: 3000,
      });
      console.log('the button is disabledAA');
    }
  }
}
