import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
/* Core Data Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { OrderService } from '../../../../services/common/models/order.service';
import { DataService } from '../../../../services/common/dataservice';

@Component({
  selector: 'app-doneorders',
  standalone: true,
  imports: [CommonModule, AgGridModule, AgCharts],
  templateUrl: './doneorders.component.html',
  styleUrls: ['./doneorders.component.scss'],
                                                    //encapsulation: ViewEncapsulation.None  // Add this line
})
export class DoneordersComponent implements OnInit {
  isBrowser: boolean;
  Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  value: number = 30;
  filterData: number = 30;
  myArray: ListOrderDate[] = [];
  //chartOptions: AgChartOptions;

  chartOptions: AgChartOptions = {
    // Data: Data to be displayed in the chart
    data: [],
  axes: [
    {
      type: 'category',
      position: 'bottom',
      label: {
        color: '#d1d1d1',
      },
    },
    {
      type: 'number',
      position: 'left',
      label: {
        color: '#d1d1d1',
      },
    },
  ],
  background: {
    fill: '#2d2d2d',
  },
  title: {
    text: '',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d1d1d1',
    textAlign: 'left',
  },
  series: [{ type: 'bar', xKey: 'month', yKey: 'orderCount' }],
};
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    //private customerService: CustomerService,
    private orderService: OrderService, private dataService: DataService,  private cdr: ChangeDetectorRef)
   {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    this.dataService.filterDataObs.subscribe((data) => {
      this.filterData = data;
      if(this.filterData < 30) {
        this.filterData = 30;           //this prohibits the code from going down 30 (1 month) days to be safe
      }
      
      this.myArray = [];
      this.updateChart();
        
      
    });

    //this.updateList();
  }

  async ngOnInit() {
    
    //this.clickOn();
    
  }
//  clicktoInc() {
//     console.log(this.myArray[0].orderCount += 5);
//     // Temporarily set the data to an empty array and then back to force re-render
//     const originalData = this.chartOptions.data;
//     this.chartOptions = {
//       ...this.chartOptions,
//       data: [] // Set to an empty array
//     };
//     this.cdr.detectChanges(); // Force change detection

//     setTimeout(() => {
//       this.chartOptions = {
//         ...this.chartOptions,
//         data: [...this.myArray] // Set back to the original data
//       };
//       this.cdr.detectChanges(); // Force change detection
//     }, 0);
//   }

  async updateChart() {
    let tempArr: any;
    
    this.myArray = [];
    let idx = 0;

    (await this.orderService.readDaysCount(this.filterData)).subscribe((result) => {
      tempArr = result;
      tempArr.map((month: number) => {
        this.myArray.push({ month: this.Months[idx], orderCount: month });
        idx++;
        
        //console.log(this.value);
        
      });

      // Update the chart data after the data is fetched
      this.chartOptions = {
        ...this.chartOptions,
        data: this.myArray
      };

      //console.log(this.myArray);
      //console.log(this.chartOptions);
    });
  //console.log(this.chartOptions);
  
    //this.chartOptions.data = this.myArray;
   }

}

export class ListOrderDate {
  month: string;
  orderCount: number;
}