import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import { PopupInputComponent } from '../../../dialogs/customerinput/customerinput.component';
import { OrderService } from '../../../../../services/common/models/order.service';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { ListOrder } from '../../../../../contracts/order/list_order';
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
    private orderService: OrderService,
    // private alertify: AlertifyService
  ) {
    this.subscription = this.dataService.refreshObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = !data;
    });
    this.subscription = this.dataService.customerIdObs.subscribe((data) => {
      console.log('SelectedCustomerId has been set', data);

      this.selectedCustomerId = data;
    });
  }

  recieveMessage($event: boolean) {
    //console.log("Recieved Message");
    this.isDisabled = $event;
    //this.selectedOrder = null;
  }

  public editSelected() {
    //console.log("Edit Selected");
    this.isDisabled = true;
  }

  /**
   *
   *
   *
   * Currently opening the dialog twice opens a old (?) page, fix the isdisabled/refresh issue and test again.
   *
   */
  async openDialog() {
    if (this.isDisabled == true) {
      console.log('dialog is opening');

      const dialogRef = this.dialog.open(OrderinputComponent, {
        width: '300px',
        data: {
          title: 'Add Order',
          description: 'Edit your data',
        },
      });

      this.sendRefreshRequest(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          //console.log('Dialog result:', result);
          //console.log("result", result);
          //console.log("selected Order", this.selectedOrder);

          const new_order: CreateOrder = new CreateOrder();

          //console.log('Edit Product:', new_order);
          new_order.Name = result.input1;
          new_order.Description = result.input2;
          new_order.Address = result.input3;
          new_order.Status = result.input4;
          new_order.CustomerId = this.selectedCustomerId;
          console.log('Create Order:', new_order);

          await this.orderService.create(new_order).then(() => {
            console.log('Created a order');
            //  this.alertify.message("Customer deleted successfully!", {
            //    messageType: MessageType.Message,
            //    position: Position.BottomRight,
            //    delay: 3,
            //    dismissOthers: true
            //  });
          });
          //console.log("Edit Selected in Update, senddata and refresh", this.sendData);

          this.sendData();
          //this.sendRefreshRequest(false);
        }
        this.sendRefreshRequest(false);
        this.isDisabled = true;
      });
    } else {
      console.log('the button is disabledAA');
    }
  }

  sendData() {
    this.dataService.setData(true);
  }

  sendRefreshRequest(flag: boolean) {
    this.dataService.setRefresh(flag);
  }
}
