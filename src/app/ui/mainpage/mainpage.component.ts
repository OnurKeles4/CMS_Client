import { AfterViewInit, Component } from '@angular/core';
import { OrderlistComponent } from "./components/orderlist/orderlist.component";
import { OrderamountComponent } from "./components/orderamount/orderamount.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [OrderlistComponent, OrderamountComponent, CommonModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent implements AfterViewInit {
  isInit: boolean = false;
  constructor() { }

  ngAfterViewInit() {
    this.isInit = true;
  }

}
