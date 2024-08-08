import { Component, Inject, inject } from '@angular/core';
//import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../services/common/dataservice';
import {
  RegisterComponent,
  SignStatus,
} from './register/register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
    IxModule,
    RegisterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //authService = inject(AuthService);
  form: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);
  didLogin = false;
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataService.setDidLogin(false);
    this.form = this.fb.group({
      email: ['myfav@mail.com'],
      password: ['1234512345'],
    });

    this.dataService.didLoginObs.subscribe((data) => {
      //console.log('data', data);

      this.didLogin = data;
    });
  }

  login(event: Event) {
    //console.log('Loggin Attempt');

    //console.log('email', this.form.controls['email'].value);
    //console.log('password', this.form.controls['password'].value);
    event.preventDefault();
    this.authService
      .login({
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      })
      .subscribe((r) => {
        this.dataService.setDidLogin(true);

        this.LoginUser();
      })
      .add(() => {
        if (!this.didLogin) {
          this.LoginFailed();
        }
      });
  }

  LoginUser() {
    this.dataService.setMessageBar({
      message: 'Logged in!',
      type: 'info',
      duration: 1000,
    });
    this.dataService.setDidSign(SignStatus.initial);
    this.router.navigate(['/']);
  }

  LoginFailed() {
    //console.log('Login Failed');
    this.dataService.setDidSign(SignStatus.initial);
    this.dataService.setMessageBar({
      message: 'Login Credentials are wrong',
      type: 'danger',
      duration: 2000,
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgetPassword() {
    //console.log('Forget Password');

    this.router.navigate(['/forgotpassword']);
  }
}
