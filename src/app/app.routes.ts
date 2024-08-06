import { Routes } from '@angular/router';
import { MainpageComponent } from './ui/mainpage/mainpage.component';
import { CustomerSearchComponent } from './ui/customersearch/customersearch.component';
import { LoginComponent } from './ui/login/login.component';

export const routes: Routes = [

    {path: '', component: MainpageComponent},
    {path: 'customersearch', component: CustomerSearchComponent},
    {path: 'login', component: LoginComponent},
];
