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
  selectedRowIndex: number;

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
        this.gridApi.setGridOption('rowData', this.rowData);
      });
    });
    this.subscription = this.dataService.refreshObs.subscribe(
      
      
      async (refresh) => {
        console.log('Data has been set, list refreshing', refresh);
        await this.updateList().then(() => {
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
      this.isDataReady = true;

      //this.selectedCustomer = this.rowData[0];
      this.sendCustomer();
      //console.log(this.selectedCustomer);
    });
  }

  //  getRowStyle = (params: any) => {
    
  //   //console.log('getRowStyle', params.node);
  //    if (params.node.rowIndex === this.selectedRowIndex) {
  //      return { background: '#00bde3' };
  //    }
  //    return null;
  //  }
  
  //  getRowStyleA(params: any) {
  //    console.log('getRowStyle', params.data);

  //    if (params.data.node.rowIndex === this.selectedRowIndex) {
  //      return { background: '#00bde3' };
  //    }
  //    return null;
  //  }
  //Send this data to Customerimfo or it's child components.
  selectCustomer(event: any) {
    console.log("row Index",event.rowIndex);
    this.selectedRowIndex = event.rowIndex;
    this.selectedCustomer = event.data; //can it be just data or should we pass the id?
    //console.log(this.selectedCustomer);
    this.sendCustomerId(event.data.id);
    this.dataService.setorderRefresh(true);
    this.sendCustomer();
    this.sendisDisabled(false);
    this.sendData(true);

    //this.getRowStyle(event);
    //console.log(this.selectedCustomer);
  }
  // changeSelected(event: any) {
  //   //this.selectedRowIndex = this.rowData.find(x => x.id === this.selectedCustomer.id).id;
  //   console.log('changeSelected', this.rowData);
     
  // }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  sendData(flag: boolean) {
    this.dataService.setData(flag);
  }
  sendisDisabled(flag: boolean) {
    this.dataService.setisDisabled(flag);

    this.dataService.setorderIsDisabled(!flag);
  }

  sendCustomer() {
    this.dataService.setCustomer(this.selectedCustomer);
  }

  sendCustomerId(id: string) {
    this.dataService.setCustomerId(id);
  }
}
