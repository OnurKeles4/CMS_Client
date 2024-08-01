import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../services/common/dataservice';
import { PopupInputComponent } from '../../dialogs/popupinput/popupinput.component';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { BasicbuttonComponent } from '../../../common/basicbutton/basicbutton.component';
import { ListCustomer } from '../../../../contracts/customer/list_customer';
import { CreateCustomer } from '../../../../contracts/customer/create_customer';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [BasicbuttonComponent],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.scss',
})
export class AddcustomerComponent {
  icon = faAdd;
  onOk = new EventEmitter();
  label: string = 'Add';
  @Output() messageEvent = new EventEmitter<boolean>();

  @Input() isDisabled: boolean;
  @Input() selectedCustomer: ListCustomer;
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private customerService: CustomerService
  ) {
    this.subscription = this.dataService.refreshObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = !data;
    });
    this.subscription = this.dataService.customerObs.subscribe((data) => {
      console.log('Data has been set', data);

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

      const dialogRef = this.dialog.open(PopupInputComponent, {
        width: '300px',
        data: {
          title: 'Add Customer',
          description: 'Edit your data',
        },
      });

      this.sendRefreshRequest(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          //console.log('Dialog result:', result);
          //console.log("result", result);
          //console.log("selected Customer", this.selectedCustomer);

          const new_customer: any = new CreateCustomer();

          //console.log('Edit Product:', new_customer);
          new_customer.Name = result.input1;
          new_customer.Email = result.input2;
          new_customer.phone_number = result.input3;

          console.log('Create Customer:', new_customer);

          await this.customerService.create(new_customer).then(() => {
            console.log('Created a customer');
            
      
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
