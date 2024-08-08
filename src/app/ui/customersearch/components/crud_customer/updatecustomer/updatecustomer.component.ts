import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IxModule } from '@siemens/ix-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../services/common/dataservice';
import {CustomerInputComponent } from '../../../dialogs/customerinput/customerinput.component';
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
      //console.log('dialog is opening');

      this.dataService.setDidLogin(false);
      const dialogRef = this.dialog.open(CustomerInputComponent, {
        width: '300px',
        data: {
          title: 'Update Customer',
          description: 'Update the customer details',
        },
        disableClose: true,
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        backdropClass: 'backdrop',
        hasBackdrop: true,
      });

      //this.dataService.setRefresh(true);
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          //console.log('Dialog result:', result);

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
            this.dataService.setMessageBar({
              message: 'Customer updated successfully!',
              type: 'info',
              duration: 3000,
            });
            //console.log('Updated a customer');
          });
  
          this.dataService.setData();
        } else {
          this.dataService.setMessageBar({
            message: 'Customer update cancelled!',
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
