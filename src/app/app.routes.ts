import { Routes } from '@angular/router';
import { MainpageComponent } from './ui/mainpage/mainpage.component';
import { CustomerSearchComponent } from './ui/customersearch/customersearch.component';
import { LoginComponent } from './ui/login/login.component';
import { authGuard } from './ui/login/auth/auth.guard';

export const routes: Routes = [

    {path: '', component: MainpageComponent, canActivate: [authGuard]},
    {path: 'customersearch', component: CustomerSearchComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
];
