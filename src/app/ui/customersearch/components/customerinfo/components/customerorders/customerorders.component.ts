import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { ListCustomer } from '../../../../../../contracts/customer/list_customer';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { OrderService } from '../../../../../../services/common/models/order.service';
import { DataService } from '../../../../../../services/common/dataservice';
import { ListOrder } from '../../../../../../contracts/order/list_order';

@Component({
  selector: 'app-customerorders',
  standalone: true,
  imports: [AgGridAngular, IxModule, CommonModule],
  templateUrl: './customerorders.component.html',
  styleUrl: './customerorders.component.scss',
})
export class CustomerordersComponent {
  @Input() customer: ListCustomer;

  isBrowser: boolean;
  isRefreshed: boolean;
  subscription: any;
  isDataReady: boolean;
  selectedCustomer: ListCustomer;
  selectedOrder: ListOrder;

  @Output() rowClicked = new EventEmitter<any>();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private orderService: OrderService,
    private dataService: DataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.subscription = this.dataService.dataObs.subscribe((refresh) => {
      //console.log('Refresh has been set', refresh);
      this.isRefreshed = refresh;
      this.updateList();
    });
    this.updateList();
  }

  rowData: ListOrder[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  colDefs: ColDef[] = [
    { field: 'name', minWidth: 295 }, //customer name
    { field: 'description', minWidth: 295 }, //customer name
  ];

  async updateList() {
    let rowdatatemp = [];
    this.orderService.read().subscribe((data) => {
      data.find((element) => {
        if (element.customerId === this.customer.id) {
          rowdatatemp.push(element);
        }
      });

      this.rowData = rowdatatemp;
      
      //console.log(this.selectedCustomer);
    });
  }

  //Send this data to Customerimfo or it's child components.
  selectCustomer(event: any) {
    this.selectedCustomer = event.data; //can it be just data or should we pass the id?
    //console.log(this.selectedCustomer);
  }

  selectOrder(event: any) {
    
    this.selectedOrder = event;
    console.log( this.selectedOrder);
    //console.log(this.rowClicked.name);
    console.log('Order has been selected');
  }

  sendRefresh() {
    this.dataService.setRefresh(!this.isRefreshed);
  }
}
