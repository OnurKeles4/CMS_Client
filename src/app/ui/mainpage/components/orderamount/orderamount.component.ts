import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
import e from 'express';
import { initialize } from '@siemens/ix/dist/types/components/utils/menu-tabs/menu-tabs-utils';

@Component({
  selector: 'app-orderamount',
  standalone: true,
  imports: [CommonModule, AgGridModule, AgCharts],
  templateUrl: './orderamount.component.html',
  styleUrls: ['./orderamount.component.scss'],
  //encapsulation: ViewEncapsulation.None  // Add this line
})
export class OrderamountComponent implements AfterViewInit{
  @ViewChild('myChart', { static: true }) chartContainer: ElementRef;
  //chartOptions: AgChartOptions
  isBrowser: boolean;
  Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  value: number = 30;
  filterData: number = 30;
  //fullMonthDay: number = 30;
  myArray: ListOrderDate[] = [];
  //chartOptions: AgChartOptions;
  chartOptions: AgChartOptions

  ngAfterViewInit(): void {
    this.initializeChart();
    this.cdr.detectChanges(); // Force change detection
  }

  initializeChart() {
    this.chartOptions = {
      // height: 100, // Height of the chart                    //EVEN THIS DOESN'T WORK IN THE FIRST LOAD.
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
            color: '#fff0',
          },
        },
      ],
      background: {
        fill: '#000028d9',
      },
      title: {
        text: 'by month',
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#d1d1d1',
        textAlign: 'left',
      },
  
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'orderCount',
          fill: '#0cc',
          cornerRadius: 10,
        },
      ],
    };
  }
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    //private customerService: CustomerService,
    private orderService: OrderService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeChart();
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.dataService.filterDataObs.subscribe((data) => {
      this.filterData = data;
      if (this.filterData < 30) {
        this.filterData = 30; //this prohibits the code from going down 30 (1 month) days to be safe
      }

      this.myArray = [];
      this.updateChart();
    });

    //this.updateList();
  }

  async updateChart() {
    let tempArr: any;
    console.log(this.chartContainer);
    
    this.myArray = [];

    (await this.orderService.readDaysCount(this.filterData)).subscribe(
      (result) => {
        tempArr = result;
        console.log('temparr', tempArr);
        result.sort((a, b) => a.month - b.month);
        result.forEach((element) => {
          this.myArray.push({
            month: this.Months[element.month - 1],
            orderCount: element.countDays,
          });
        });

        this.chartOptions = {
          ...this.chartOptions,
          data: this.myArray,
        };

        console.log(this.myArray);
      }
    );
  }
}

export class ListOrderDate {
  month: string;
  orderCount: number;
}
