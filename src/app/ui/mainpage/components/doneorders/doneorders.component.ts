import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
/* Core Data Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-doneorders',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './doneorders.component.html',
  styleUrls: ['./doneorders.component.scss'],
                                                    //encapsulation: ViewEncapsulation.None  // Add this line
})
export class DoneordersComponent {
  isBrowser: boolean;
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

  
  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };
  public clickTest() {
  console.log(this.rowData);
  console.log(this.colDefs);
}

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}
}