import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { ListCustomer } from '../../../../contracts/customer/list_customer';
import { ListOrder } from '../../../../contracts/order/list_order';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../../services/common/dataservice';
import { Router } from '@angular/router';
import { CustomerlistComponent } from '../../../customersearch/components/customerlist/customerlist.component';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule, AgGridModule, IxModule],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent {
  router = inject(Router);
  isBrowser: boolean;
  isDataReady: boolean = false;
  ifLastMonth: boolean = false;
  subscription: any;
  // selectedCustomer: ListCustomer [];

  whichFilter: number = 0;
  FilterDays: number = 30;
  isConcat: boolean;
  gridApi: any;

  FilterDaysArray: number[] = [30, 90, 180, 36000];

  loadingTemplate: string = `<div class="spinner-container">
        <h3 class="text">Waiting for data...</h3>
        </div>`;

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
  //The filter days will be assigned by the dropdown on the screen and the data will be updated accordingly.
  adaptFilter(val: number) {
    //console.log('filter value', val);
    if (this.FilterDays == val) return null;
    this.FilterDays = val;
    this.rowData = [];
    this.ifLastMonth = false;
    this.updateList(); //
    this.dataService.setFilterData(this.FilterDays);
  }

  /**
   *
   * Both versions of updateList() are working. This version uses readwithId function.
   *
   */
  // async updateList() {
  //   let rowdatatemp: CustomerOrderList[] = [];
  //   (await this.orderService.readLastMonth(this.FilterDays)).subscribe(
  //     (orders) => {
  //       // //console.log("orders", orders);

  //       this.tempArr = orders;
  //       orders.forEach(async (order) => {
  //         this.temp = await this.customerService.readWithId(order.customerId); //Instead of reading all customers 100 times, read it once, save it in an array, check id values from there.
  //         //console.log('a', this.temp.name);

  //         this.rowData.push({
  //           customer_name: this.temp.name,
  //           order_name: order.name,
  //           order_id: order.id,
  //           status: order.status,
  //         });
  //         this.gridApi.setGridOption('rowData', this.rowData);
  //       });
  //       //this.concatData(rowdatatemp);

  //       // if(this.ifLastMonth) {
  //       this.isDataReady = true;
  //       // }
  //     }
  //   );
  // }

  /**
   *
   * Both versions of updateList() are working. This version doesn't use readwithId function so it won't go back
   * and for to the database for order amount of times, but instead it is using find.
   */
  async updateList() {
    let rowdatatemp: ListCustomer[] = [];
    (await this.orderService.readLastMonth(this.FilterDays)).subscribe(
      async (orders) => {
        this.customerService
          .read()
          .subscribe((customers) => {
            rowdatatemp = customers;
            //console.log('Data has been set', rowdatatemp);
          })
          .add(() => {
            this.tempArr = orders;
            orders.forEach(async (order) => {
              this.temp = rowdatatemp.filter(
                (customer) => customer.id === order.customerId
              ); //Instead of reading all customers 100 times, read it once, save it in an array, check id values from there.
              //console.log('a', this.temp[0].name);

              this.rowData.push({
                customer_id: this.temp[0].id,
                customer_name: this.temp[0].name,
                order_name: order.name,
                order_id: order.id,
                status: order.status,
              });
              this.gridApi.setGridOption('rowData', this.rowData);

              //console.log("orderslist", this.rowData);
            });
            //console.log("orders", this.rowData);
          });

        this.isDataReady = true;
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  async selectCustomer(event: any) {
    console.log('event', event.data);
    
    
    const a: any = await this.customerService
      .readWithId(event.data.customer_id);
      
    const b: any = await this.orderService
    .readWithId(event.data.order_id);
    console.log("order", b);
    

    this.dataService.setCustomerId(a.id);
    this.dataService.setCustomer(a);
    //this.dataService.setorderRefresh(true);
    this.dataService.setisDisabled(false);
    this.dataService.setorderIsDisabled(false);
    this.dataService.setOrderId(b.id);
    this.dataService.setData(true);
    //console.log('customer', a.id);
    this.router.navigate(['/customersearch']);
  }

  gridOptions = {};
}

class CustomerOrderList {
  customer_id: string;
  customer_name: string;
  order_name: string;
  order_id: string;
  status: string;
}
