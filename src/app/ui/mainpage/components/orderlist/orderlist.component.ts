import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { ListCustomer } from '../../../../contracts/customer/list_customer';
import { ListOrder } from '../../../../contracts/order/list_order';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent {
  isBrowser: boolean;
  isDataReady: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private customerService: CustomerService,
  private orderService: OrderService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    
    this.updateList();
  }

  rowData: any[] = [];
  rowDatatemp:any[] = [];
  tempArr: ListOrder[];
  colDefs: ColDef[] = [
    { field: "customerName" },          //customer name,
    { field: "name" },         //order date
    { field: "id" },         //order number
    { field: "status" },         //
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };
 
  async updateList() {
    let rowdatatemp = [];
    this.orderService.read().subscribe((orders) => 
      {
        console.log(orders);
        
        this.rowData = orders;
        // this.tempArr = orders;
        // //console.log(this.tempArr[0].customerId);
        // let rowdatatemp = [];
        // this.tempArr.forEach(async (order) => { 
        //  console.log("order", order.customerId);
         
          
          
        //   console.log("order", temp.name);
        //   this.rowData.push({
        //     customer_name: temp.name,
        //     order_name: order.name,
        //     order_id: order.id,
        //     status: order.status
        //   });
        //   console.log("end of for", this.rowData);
          
        });
        
    
     
  }

  assignData() {
    this.rowData;
    this.updateList();
  }
}



class CustomerOrderList {
  customer_name: string;
  order_name: string;
  order_id: string;
  status: string;
}