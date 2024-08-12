import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import { CustomerInputComponent} from '../../../dialogs/customerinput/customerinput.component';
import { CustomerService } from '../../../../../services/common/models/customer.service';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { ListCustomer } from '../../../../../contracts/customer/list_customer';
import { CreateCustomer } from '../../../../../contracts/customer/create_customer';
import { MessageComponent } from '../../../../common/message/message.component';

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

  isDisabled: boolean = false;
  @Input() selectedCustomer: ListCustomer;
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private customerService: CustomerService
  ) {

    this.subscription = this.dataService.customerObs.subscribe((data) => {
      //console.log('Data has been set', data);
      this.selectedCustomer = data;
    });
  }

  async openDialog() {
    if (this.isDisabled == false) {

      this.dataService.setDidLogin(false);
      const dialogRef = this.dialog.open(CustomerInputComponent, {
        width: '300px',
        data: {
          title: 'Add Customer',
          description: 'Please enter the customer details',
        },
        disableClose: true,
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        backdropClass: 'backdrop',
        hasBackdrop: true,
      });

      //this.dataService.setRefresh(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result && result.name && result.email && result.phone_number) {
         
          const new_customer: any = new CreateCustomer();

          //console.log('Edit Product:', new_customer);
          new_customer.Name = result.name;
          new_customer.Email = result.email;
          new_customer.phone_number = result.phone_number;

          //console.log('Create Customer:', new_customer);

          await this.customerService.create(new_customer).then(() => {
            //console.log('Created a customer');
            this.dataService.setRefresh(false);
            this.dataService.setMessageBar({
              message: 'Customer added successfully!',
              type: 'info',
              duration: 3000,
            });
            this.dataService.setDidLogin(true);
          });

          this.dataService.setData();
          //this.dataService.setRefresh(false);
        } else {
          this.dataService.setMessageBar({
            message: 'Customer add not valid!',
            type: 'danger',
            duration: 3000,
          });
        }
        //this.dataService.setRefresh(false);
      });
    } else {
      this.dataService.setMessageBar({
        message: 'Button is disabled!',
        type: 'warning',
        duration: 3000,
      });
      //console.log('the button is disabledAA');
    }
  }
}
