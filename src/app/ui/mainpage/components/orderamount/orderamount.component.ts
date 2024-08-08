import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
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
import { IxModule } from '@siemens/ix-angular';
import { OrderStatus } from '../../../customersearch/components/crud_order/addorder/addorder.component';

@Component({
  selector: 'app-orderamount',
  standalone: true,
  imports: [CommonModule, AgGridModule, AgCharts, IxModule],
  templateUrl: './orderamount.component.html',
  styleUrls: ['./orderamount.component.scss'],
  //encapsulation: ViewEncapsulation.None  // Add this line
})
export class OrderamountComponent implements AfterContentInit {
  @ViewChild('myChart', { static: true }) chartContainer: ElementRef;
  //chartOptions: AgChartOptions
  isBrowser: boolean;
  isReady: boolean = false;

  orderStatus = OrderStatus;
  selectedStatus: string = 'All';
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
  myCompletedArray: ListOrderDate[] = [];
  //chartOptions: AgChartOptions;
  chartOptions: AgChartOptions;

  ngAfterContentInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    this.chartOptions = {
      //height: 1000, // Height of the chart                    //EVEN THIS DOESN'T WORK IN THE FIRST LOAD.
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
          yKey: 'statusCount',
          yName: 'Status Orders',

          fill: '#00ffb9',
          shadow: {
            color: '#009d73',
            xOffset: 5,
            yOffset: 0,
            blur: 3,
          },
          stackGroup: 'NOL',
          cornerRadius: 20,
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'orderCount',
          yName: 'Orders',
          fill: '#0cc',
          shadow: {
            color: '#007b7b',
            xOffset: 5,
            yOffset: 0,
            blur: 3,
          },
          stackGroup: 'NOL',
          cornerRadius: 20,
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
    this.isBrowser = isPlatformBrowser(this.platformId);
    //this.updateChart();

    this.dataService.filterDataObs.subscribe((data) => {
      this.filterData = data;
      if (this.filterData < 30) {
        this.filterData = 30; //this prohibits the code from going down 30 (1 month) days to be safe
      }

      this.myArray = [];
      //console.log('filterData in service', this.filterData);

      this.updateChart();
    });

    //console.log('filterData before update in constr', this.filterData);
    this.updateChart();
    //this.updateList();
  }

  async updateChart() {
    //console.log('update chart worked!', this.filterData);
    this.isReady = false;
    this.dataService.setRefresh(true);
    let tempArr: any;
    //console.log(this.chartContainer);

    this.myArray = [];

    (
      await this.orderService.readStatusDaysCount(
        this.filterData,
        this.selectedStatus
      )
    ).subscribe(async (result) => {
      tempArr = result;
      //console.log('temparr', tempArr);
      result.sort((a, b) => a.month - b.month);

      (await this.orderService.readDaysCount(this.filterData)).subscribe(
        (resultComplete) => {
          var idx = 0;
          tempArr = resultComplete;
          //console.log('temparr', tempArr);
          resultComplete.sort((a, b) => a.month - b.month);
          resultComplete.forEach((element) => {
            this.myArray.push({
              month: this.Months[element.month - 1],
              orderCount: element.countDays - result[idx].countDays,
              statusCount: result[idx].countDays,
            });
            idx++;
          });

          //  this.chartOptions = {
          //    ...this.chartOptions,
          //    data: this.myArray,
          //  };

          //console.log(this.myArray);

          this.chartOptions = {
            ...this.chartOptions,
            data: this.myArray,
          };
          this.isReady = true;

          this.dataService.setRefresh(false);
        }
      );

      //console.log('my array', this.myArray);
    });
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.updateChart();
  }
}

export class ListOrderDate {
  month: string;
  orderCount: number;
  statusCount: number;
}
