import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import { OrderService } from '../../../../../services/common/models/order.service';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { CreateOrder } from '../../../../../contracts/order/create_order';
import { OrderinputComponent } from '../../../dialogs/orderinput/orderinput.component';
// import { AlertifyService, MessageType, Position } from '../../../../common/message/alerfity.service';

@Component({
  selector: 'app-addorder',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './addorder.component.html',
  styleUrl: './addorder.component.scss',
})
export class AddorderComponent {
  icon = faAdd;
  onOk = new EventEmitter();
  label: string = 'Add';
  @Output() messageEvent = new EventEmitter<boolean>();

  @Input() isDisabled: boolean;
  selectedCustomerId: string;
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private orderService: OrderService
  ) // private alertify: AlertifyService
  {
    this.subscription = this.dataService.isDisabledObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = !data;
    });
    this.subscription = this.dataService.customerIdObs.subscribe((data) => {
      console.log('SelectedCustomerId has been set', data);

      this.selectedCustomerId = data;
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
    if (this.isDisabled == true) {
      //console.log('dialog is opening');

      this.dataService.setDidLogin(false);
      const dialogRef = this.dialog.open(OrderinputComponent, {
        width: '300px',
        data: {
          title: 'Add Order',
          description: 'Add a new order',
        },
        disableClose: true,
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        backdropClass: 'backdrop',
        hasBackdrop: true,
        
      });

      //this.dataService.setRefresh(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result && result.input4) {
          console.log('Dialog result:', result);
          console.log('result', result);
          //console.log('selected Order', this.selectedOrder);

          const new_order: CreateOrder = new CreateOrder();

          console.log('Edit Product:', new_order);
          new_order.Name = result.input1;
          new_order.Description = result.input2;
          new_order.Address = result.input3;
          new_order.Status = result.input4;
          new_order.CustomerId = this.selectedCustomerId;
          console.log('Create Order:', new_order);

          await this.orderService.create(new_order).then(() => {
            console.log('Created a order');
            this.dataService.setRefresh(false);

            this.dataService.setMessageBar({
              message: 'Order added successfully!',
              type: 'info',
              duration: 3000,
            });
            this.dataService.setDidLogin(true);
          });
          console.log(
            'Edit Selected in Update, dataService.setData and refresh',
            this.dataService.setData
          );

          this.dataService.setData();
        } else {
          this.dataService.setMessageBar({
            message: 'Order not valid!',
            type: 'danger',
            duration: 3000,
          });
        }

        //this.dataService.setRefresh(false);
        this.isDisabled = true;
      });
    } else {
      this.dataService.setMessageBar({
        message: 'Button is disabled!',
        type: 'warning',
        duration: 3000,
      });
      //console.log('the button is disabledAA');
    }
    // console.log("setting order refresh to true");

    this.dataService.setorderRefresh(true);
  }
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
