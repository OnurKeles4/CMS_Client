import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { AgGridAngular } from 'ag-grid-angular';

import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { DataService } from '../../../../services/common/dataservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ListCustomer } from '../../../../contracts/customer/list_customer';
@Component({
  selector: 'app-customerlist',
  standalone: true,
  imports: [AgGridAngular, IxModule, CommonModule],
  templateUrl: './customerlist.component.html',
  styleUrl: './customerlist.component.scss',
})
export class CustomerlistComponent {
  isBrowser: boolean;
  subscription: any;
  isDataReady: boolean;
  selectedCustomer: ListCustomer;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private customerService: CustomerService,
    private dataService: DataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.subscription = this.dataService.dataObs.subscribe((data) => {
     // console.log('Data has been set', data);
     this.updateList();
    });
    this.subscription = this.dataService.refreshObs.subscribe((refresh) => {
      // console.log('Data has been set', data);
      //console.log("a");
      
      
     });
    this.updateList();
  }

  rowData: any[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  colDefs: ColDef[] = [
    { field: 'name', minWidth:295, width:295}, //customer name
  ];

  async updateList() {
    let rowdatatemp = [];
    this.customerService.read().subscribe((data) => {
      rowdatatemp = data;

      this.rowData = rowdatatemp;
      this.isDataReady = true;
      
        this.selectedCustomer = this.rowData[0];
        this.sendCustomer();
        //console.log(this.selectedCustomer);
        
      
    });
  }

  //Send this data to Customerimfo or it's child components. 
  selectCustomer(event: any) {
    this.selectedCustomer = event.data;     //can it be just data or should we pass the id?
    console.log(this.selectedCustomer);
    this.sendCustomer();
    //console.log(this.selectedCustomer);
    
    
  }

  sendCustomer() {
  this.dataService.setCustomer(this.selectedCustomer);
  this.sendRefreshRequest(true);
  }

  sendRefreshRequest(flag: boolean) {
    console.log('Send Refresh Request in Delete being sent');
    this.dataService.setRefresh(flag);
  }
}
