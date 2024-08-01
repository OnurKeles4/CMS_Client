import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../services/common/dataservice';
import { PopupInputComponent } from '../../dialogs/customerinput/customerinput.component';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { BasicbuttonComponent } from '../../../common/basicbutton/basicbutton.component';
import { ListCustomer } from '../../../../contracts/customer/list_customer';

@Component({
  selector: 'app-updatecustomer',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.scss',
})
export class UpdatecustomerComponent {
  icon = faEdit;
  onOk = new EventEmitter();
  label: string = 'Update';
  @Output() messageEvent = new EventEmitter<boolean>();

  @Input() isDisabled: boolean = true;
  @Input() selectedCustomer: ListCustomer;
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private customerService: CustomerService
  ) {
    this.subscription = this.dataService.dataObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = data;
    });
    this.subscription = this.dataService.customerObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.selectedCustomer = data;
    });
  }

  recieveMessage($event: boolean) {
    //console.log("Recieved Message");
    this.isDisabled = $event;
    //this.selectedCustomer = null;
  }

  public editSelected() {
    //console.log("Edit Selected");
    this.isDisabled = true;
  }

  async openDialog() {
    if (this.isDisabled == true) {
      console.log('dialog is opening');

      const dialogRef = this.dialog.open(PopupInputComponent, {
        width: '300px',
        data: {
          title: 'Update Customer',
          description: 'Edit your data',
        },
      });

      this.sendRefreshRequest(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          //console.log('Dialog result:', result);
          //console.log("result", result);
          //console.log("selected Customer", this.selectedCustomer);

          const edit_customer: any = await this.customerService.readWithId(
            this.selectedCustomer.id
          );

          //console.log('Edit Product:', edit_customer);
          edit_customer.Name = result.input1
            ? result.input1
            : this.selectedCustomer.name;
          edit_customer.Email = result.input2
            ? result.input2
            : this.selectedCustomer.email;
          edit_customer.phone_number = result.input3
            ? result.input3
            : this.selectedCustomer.phone_number;

          //console.log('Edit Product:', edit_customer);

          await this.customerService.update(edit_customer).then(() => {
            console.log('Updated a customer');
          });
          //console.log("Edit Selected in Update, senddata and refresh", this.sendData);

          this.sendData();
          //this.sendRefreshRequest(false);
        }

        this.sendRefreshRequest(false);
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
