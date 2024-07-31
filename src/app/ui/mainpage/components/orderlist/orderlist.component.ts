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
  FilterDays: number = 0;
  isConcat: boolean;
  gridApi: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private customerService: CustomerService,
    private orderService: OrderService,
    private dataService: DataService
  )
   {
    this.isBrowser = isPlatformBrowser(this.platformId);
this.subscription = this.dataService.dataObs.subscribe(data => {
    console.log('Data has been set', data);
    //this.ifLastMonth = data;
    //this.updateList();
    //this.concatData();
      });
    this.updateList();
  }


  rowData: CustomerOrderList[] = [];
  temp: any;
  rowDatatemp: ListCustomer[] = [];
  tempArr: ListOrder[];
  colDefs: ColDef[] = [
    { field: 'customer_name', }, //customer name,
    { field: 'order_name' }, //order date
    { field: 'order_id' }, //order number
    { field: 'status' }, //
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  adaptFilter() {
    //console.log('filter', this.ifLastMonth);
    
      this.rowData = [];
    this.ifLastMonth = false;
    this.filterSwitch();
    this.updateList();//
  }

  filterSwitch() {
      switch (this.FilterDays) {
        case 0:
          this.FilterDays = 30;
          break;
        case 30:
          this.FilterDays = 60;
          break;
        case 60:
          this.FilterDays = 90;
          break;
        case 90:
          this.ifLastMonth = false;
          this.FilterDays = 0;
          break;
          
  }
  
  console.log('filterdays', this.FilterDays);
}

  // async updateList() {
  //   let rowdatatemp = [];
  //   this.orderService.read().subscribe((orders) => {
  //     console.log(orders);

  //     this.tempArr = orders;

  //     this.customerService.read().subscribe((customers) => {
  //       this.tempArr.forEach(async (order) => {
  //         customers.find((customer) => {
  //           if (customer.id == order.customerId) {
  //             this.rowData.push({
  //               customer_name: customer.name,
  //               order_name: order.name,
  //               order_id: order.id,
  //               status: order.status,
  //             });
  //           }
  //         });
  //       });
  //       console.log('row data', this.rowData);

  //       this.isDataReady = true;
  //     });
  //   });
  // }
  async updateList() {
    let rowdatatemp: CustomerOrderList[] = [];
    (await this.orderService.readLastMonth(this.FilterDays, this.ifLastMonth)).subscribe((orders) => {
      //console.log("orders", orders);

      this.tempArr = orders;
      orders.forEach(async (order) => {
      this.temp = await this.customerService.readWithId(order.customerId);
      console.log("a", this.temp.name);
        
      this.rowData.push({
          customer_name: this.temp.name,
          order_name: order.name,
          order_id: order.id,
          status: order.status,
        });
        this.gridApi.setGridOption("rowData", this.rowData);
        
      });
      //this.concatData(rowdatatemp);
          
    // if(this.ifLastMonth) {
    this.isDataReady = true;
    // }
    });
  

  }
  concatData(arr: any) {
    
    console.log("rowData", this.rowData);
    this.isDataReady = true;
    //this.rowData = arr;
    
    this.gridApi.setRowData(this.rowData);
    console.log("rowData after", this.rowData);
    

  }

  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
  }

  gridOptions = {
  }

  sendData() {
    //this.dataService.setData(!this.ifLastMonth);
  }


}

class CustomerOrderList {
  customer_name: string;
  order_name: string;
  order_id: string;
  status: string;
}
