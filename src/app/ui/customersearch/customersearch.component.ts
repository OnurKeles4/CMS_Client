import { Component } from '@angular/core';
import { CustomerinfoComponent } from './components/customerinfo/customerinfo.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { BasicbuttonComponent } from '../common/basicbutton/basicbutton.component';
import { AddcustomerComponent } from "./components/crud_customer/addcustomer/addcustomer.component";
import { UpdatecustomerComponent } from "./components/crud_customer/updatecustomer/updatecustomer.component";
import { DeletecustomerComponent } from "./components/crud_customer/deletecustomer/deletecustomer.component";
import { DeleteorderComponent } from "./components/crud_order/deleteorder/deleteorder.component";
import { UpdateorderComponent } from "./components/crud_order/updateorder/updateorder.component";
import { AddorderComponent } from "./components/crud_order/addorder/addorder.component";
import { DataService } from '../../services/common/dataservice';

@Component({
  selector: 'app-customersearch',
  standalone: true,
  imports: [
    CustomerinfoComponent,
    CustomerlistComponent,
    BasicbuttonComponent,
    AddcustomerComponent,
    UpdatecustomerComponent,
    DeletecustomerComponent,
    DeleteorderComponent,
    UpdateorderComponent,
    AddorderComponent
],
  templateUrl: './customersearch.component.html',
  styleUrl: './customersearch.component.scss',
})
export class CustomerSearchComponent {


  constructor() {
   
  }
}
