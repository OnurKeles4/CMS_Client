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

      
      
     });
    this.updateList();
  }
  

  rowData: any[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  colDefs: ColDef[] = [
    { field: 'name', minWidth:378, width:378}, //customer name
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
    this.sendisDisabled(false);
    //console.log(this.selectedCustomer);
    
    
  }

  sendisDisabled(flag: boolean) {
    this.dataService.setisDisabled(flag);
  }

  sendCustomer() {
  this.dataService.setCustomer(this.selectedCustomer);
  this.sendRefreshRequest(true);
  }
  //this is causing the isdisabled turn into true                 //THIS SETREFRESH SHOULDN'T BE COMMENTED OUT
  sendRefreshRequest(flag: boolean) {
    console.log('Send Refresh Request in Delete being sent');
    //this.dataService.setRefresh(flag);
  }
}
