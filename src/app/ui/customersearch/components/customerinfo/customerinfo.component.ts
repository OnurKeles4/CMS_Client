import { Component } from '@angular/core';
import { CustomerdetailComponent } from "./components/customerdetail/customerdetail.component";
import { CustomerordersComponent } from "./components/customerorders/customerorders.component";
import { DataService } from '../../../../services/common/dataservice';
import { ListCustomer } from '../../../../contracts/customer/list_customer';

@Component({
  selector: 'app-customerinfo',
  standalone: true,
  imports: [CustomerdetailComponent, CustomerordersComponent],
  templateUrl: './customerinfo.component.html',
  styleUrl: './customerinfo.component.scss'
})
export class CustomerinfoComponent {

  customer: ListCustomer;

  constructor(private dataService: DataService) {
    this.dataService.customerObs.subscribe((data) => {
      this.customer = data;
      //console.log(this.customer);
    });

   }
}
