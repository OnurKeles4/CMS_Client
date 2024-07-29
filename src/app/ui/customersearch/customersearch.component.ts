import { Component } from '@angular/core';
import { CustomerinfoComponent } from "./components/customerinfo/customerinfo.component";
import { CustomerlistComponent } from "./components/customerlist/customerlist.component";

@Component({
  selector: 'app-customersearch',
  standalone: true,
  imports: [CustomerinfoComponent, CustomerlistComponent],
  templateUrl: './customersearch.component.html',
  styleUrl: './customersearch.component.scss'
})
export class CustomerSearchComponent {

}
