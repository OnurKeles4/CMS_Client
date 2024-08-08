import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { ListCustomer } from '../../../../contracts/customer/list_customer';
import { ListOrder } from '../../../../contracts/order/list_order';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../../services/common/dataservice';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule, AgGridModule, IxModule],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent {
  isBrowser: boolean;
  isDataReady: boolean = false;
  ifLastMonth: boolean = false;
  subscription: any;

  whichFilter: number = 0;
  FilterDays: number = 30;
  isConcat: boolean;
  gridApi: any;

  FilterDaysArray: number[] = [30, 90, 180, 36000];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private customerService: CustomerService,
    private orderService: OrderService,
    private dataService: DataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.dataService.setFilterData(this.FilterDays);
    this.updateList();
  }

  rowData: CustomerOrderList[] = [];
  temp: any;
  rowDatatemp: ListCustomer[] = [];
  tempArr: ListOrder[];
  colDefs: ColDef[] = [
    { field: 'customer_name', headerName: 'Customer' }, //customer name,
    { field: 'order_name', headerName: 'Order' }, //order date
    { field: 'order_id', headerName: 'Order Id' }, //order number
    { field: 'status', headerName: 'Status' }, //
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  adaptFilter(val: number) {
    //console.log('filter value', val);
    this.FilterDays = val;
    this.rowData = [];
    this.ifLastMonth = false;
    //this.filterSwitch();
    this.updateList(); //
    this.dataService.setFilterData(this.FilterDays);
  }

  filterSwitch() {
    //console.log('filterdays in switch', this.FilterDays);

    switch (this.FilterDays) {
      case 30: //if initial value
        this.FilterDays = 90; //set to 90 (3 months)
        break;
      case 90:
        this.FilterDays = 180; //set to 180 (6 months)
        break;
      case 180:
        this.FilterDays = 36000; //set to 36000 (10 years)
        break;
      case 36000:
        this.ifLastMonth = false;
        this.FilterDays = 30;
        break;
    }

    //console.log('filterdays', this.FilterDays);
  }

  async updateList() {
    let rowdatatemp: CustomerOrderList[] = [];
    (await this.orderService.readLastMonth(this.FilterDays)).subscribe(
      (orders) => {
        // //console.log("orders", orders);

        this.tempArr = orders;
        orders.forEach(async (order) => {
          this.temp = await this.customerService.readWithId(order.customerId); //Instead of reading all customers 100 times, read it once, save it in an array, check id values from there.
          //console.log('a', this.temp.name);

          this.rowData.push({
            customer_name: this.temp.name,
            order_name: order.name,
            order_id: order.id,
            status: order.status,
          });
          this.gridApi.setGridOption('rowData', this.rowData);
        });
        //this.concatData(rowdatatemp);

        // if(this.ifLastMonth) {
        this.isDataReady = true;
        // }
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  gridOptions = {};
}

class CustomerOrderList {
  customer_name: string;
  order_name: string;
  order_id: string;
  status: string;
}
