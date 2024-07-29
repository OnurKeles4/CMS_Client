import { Routes } from '@angular/router';
import { MainpageComponent } from './ui/mainpage/mainpage.component';
import { CustomerSearchComponent } from './ui/customersearch/customersearch.component';

export const routes: Routes = [

    {path: '', component: MainpageComponent},
    {path: 'customersearch', component: CustomerSearchComponent},
];
