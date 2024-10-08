import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { AgGridAngular } from 'ag-grid-angular';

import { ColDef, GridReadyEvent } from 'ag-grid-community';
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
 
  gridApi: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private customerService: CustomerService,
    private dataService: DataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.subscription = this.dataService.dataObs.subscribe(async (data) => {
      // //console.log('Data has been set', data);
      await this.updateList().then(() => {
        if(this.gridApi) {
        this.gridApi.setGridOption('rowData', this.rowData);
        }
      });
    });
    this.subscription = this.dataService.refreshObs.subscribe(
      
      
      async (refresh) => {
        //console.log('Data has been set, list refreshing', refresh);
        await this.updateList().then(() => {
          
          
          if(this.gridApi)
          this.gridApi.setGridOption('rowData', this.rowData);
        });
      }
    );



    this.updateList();
  }

  rowData: ListCustomer[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  colDefs: ColDef[] = [
    { field: 'name', minWidth: 378, width: 378 }, //customer name
  ];

  async updateList() {
    let rowdatatemp = [];
    this.customerService.read().subscribe((data) => {
      rowdatatemp = data;

      this.rowData = rowdatatemp;
      this.isDataReady = true;                                                           //Commented for test, Might cause a problem. 
      
      //console.log(this.selectedCustomer);
    });
  }

  
  selectCustomer(event: any) {
    //console.log("row Index",event.rowIndex);
    this.selectedCustomer = event.data; //can it be just data or should we pass the id?
    console.log(this.selectedCustomer);
    this.dataService.setCustomerId(event.data.id);
    
    this.dataService.setCustomer(this.selectedCustomer);
    this.dataService.setorderRefresh(true);
    this.dataService.setisDisabled(false);
    this.dataService.setorderIsDisabled(!true);
    this.dataService.setOrderId(null);
    this.dataService.setData(true);

    //console.log(this.selectedCustomer);
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }





}
