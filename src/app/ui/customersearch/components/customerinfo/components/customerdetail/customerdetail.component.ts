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
  styleUrl: './customerdetail.component.scss'
})
export class CustomerdetailComponent {
 @Input() customer: ListCustomer;
 isRefresh: boolean;
 constructor(private dataService: DataService) {
  this.dataService.refreshObs.subscribe((refresh) => {
     this.isRefresh = refresh;
    //console.log(this.customer);
  });

 }

}
