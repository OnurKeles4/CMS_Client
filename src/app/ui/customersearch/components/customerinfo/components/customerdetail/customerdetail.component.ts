import { Component, Input } from '@angular/core';
import { ListCustomer } from '../../../../../../contracts/customer/list_customer';
import { IxModule } from '@siemens/ix-angular';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../../services/common/dataservice';

@Component({
  selector: 'app-customerdetail',
  standalone: true,
  imports: [IxModule, CommonModule],
  templateUrl: './customerdetail.component.html',
  styleUrl: './customerdetail.component.scss',
})
export class CustomerdetailComponent {
  @Input() customer: ListCustomer;
  isData: boolean = false;
  constructor(private dataService: DataService) {
    //this.isData = false;
    this.dataService.isDisabledObs.subscribe((data) => {
      this.isData = !data;
      //console.log(this.customer);
    });
    this.dataService.isDisabledObs.subscribe((data) => {
      console.log('Data has been set', data);
      
      this.isData = !data;
    });
  }
}
