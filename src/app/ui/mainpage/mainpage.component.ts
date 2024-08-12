import { Component } from '@angular/core';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { OrderamountComponent } from './components/orderamount/orderamount.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/common/dataservice';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [OrderlistComponent, OrderamountComponent, CommonModule, IxModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss',
})
export class MainpageComponent {
  isDisabled: boolean = false;

  //To wait for the data being get from the database so datatables won't be empty, isDisabled is set to false/true accordingly.
  constructor(private dataService: DataService) {
    this.dataService.refreshObs.subscribe((data) => {
      this.isDisabled = data;
    });
  }
}
