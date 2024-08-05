import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import { PopupInputComponent } from '../../../dialogs/customerinput/customerinput.component';
import { CustomerService } from '../../../../../services/common/models/customer.service';
import { BasicbuttonComponent } from '../../../../common/basicbutton/basicbutton.component';
import { ListCustomer } from '../../../../../contracts/customer/list_customer';

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
    this.subscription = this.dataService.isDisabledObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.isDisabled = data;
    });
    this.subscription = this.dataService.customerObs.subscribe((data) => {
      //console.log('Data has been set', data);

      this.selectedCustomer = data;
    });
  }

  async openDialog() {
    if (this.isDisabled == false) {
      console.log('dialog is opening');

      const dialogRef = this.dialog.open(PopupInputComponent, {
        width: '300px',
        data: {
          title: 'Update Customer',
          description: 'Update the customer details',
        },
      });

      this.dataService.setRefresh(true);
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

          console.log('Edit Product:', edit_customer);

          await this.customerService.update(edit_customer).then(() => {
            
            this.dataService.setMessageBar({message: 'Customer updated successfully!', type: 'info', duration: 3000});
            console.log('Updated a customer');
          });
          //console.log("Edit Selected in Update, dataService.setData and refresh", this.dataService.setData);

          this.dataService.setData();
          //this.dataService.setRefresh(false);
        }
        else {
          
      this.dataService.setMessageBar({message: 'Customer update cancelled!', type: 'danger', duration: 3000});
        }
        this.dataService.setRefresh(false);
      });
    } else {
      
      this.dataService.setMessageBar({message: 'Button is disabled!', type: 'warning', duration: 3000});
      console.log('the button is disabledAA');
    }
  }

}
