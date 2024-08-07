import { Routes } from '@angular/router';
import { MainpageComponent } from './ui/mainpage/mainpage.component';
import { CustomerSearchComponent } from './ui/customersearch/customersearch.component';
import { LoginComponent } from './ui/login/login.component';
import { authGuard } from './ui/login/auth/auth.guard';
import { RegisterComponent } from './ui/login/register/register/register.component';
import { ForgotpasswordComponent } from './ui/login/forgotpassword/forgotpassword.component';

export const routes: Routes = [

    {path: '', component: MainpageComponent, canActivate: [authGuard]},
    {path: 'customersearch', component: CustomerSearchComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},
];
