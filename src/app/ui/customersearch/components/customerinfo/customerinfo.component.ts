import { Component } from '@angular/core';
import { CustomerdetailComponent } from "./components/customerdetail/customerdetail.component";
import { CustomerordersComponent } from "./components/customerorders/customerorders.component";

@Component({
  selector: 'app-customerinfo',
  standalone: true,
  imports: [CustomerdetailComponent, CustomerordersComponent],
  templateUrl: './customerinfo.component.html',
  styleUrl: './customerinfo.component.scss'
})
export class CustomerinfoComponent {

}
