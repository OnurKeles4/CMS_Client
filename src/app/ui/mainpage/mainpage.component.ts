import { Component } from '@angular/core';
import { OrderlistComponent } from "./components/orderlist/orderlist.component";
import { DoneordersComponent } from "./components/doneorders/doneorders.component";

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [OrderlistComponent, DoneordersComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {

}
