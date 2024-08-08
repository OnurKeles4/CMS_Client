import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../../services/common/dataservice';
import { CustomValidators } from '../../../customersearch/dialogs/base/customValidators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IxModule, RouterModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: any;
  router = inject(Router);
  didRegister: string = "";
  constructor(private fb: FormBuilder, private dataService: DataService,
     customValidators: CustomValidators, private authService : AuthService) {
      
      this.dataService.didRegisterObs.subscribe((data) => {
      if(data == RegisterStatus.success)
      {
        console.log("Register Succeedd");
        
        this.didRegister = data;
        this.RegisterUser();
      }
      else if(data == RegisterStatus.failed) {
        this.RegisterFailed();
      }
      });

   this.dataService.setDidLogin(false);
    this.form = this.fb.group({
      name: ['Onur Keleş', [customValidators.optionalLengthValidator(2,100)]],
      email: ['qqqq@qqq.com', [customValidators.optionalLengthValidator(5,100), customValidators.EmailValidator()]],                                   //rename these fields accurately later
      password: ['1234512345', [customValidators.optionalLengthValidator(8,100)]],
      phone_number: ['123 123 1234', [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)]],
      });
  }

  goBack() {
    console.log('Going back');
  this.router.navigate(['/login']);
  }

  async registerUser(event: Event) {
    console.log('Register Attempt');

    //console.log('email', this.form.controls['email'].value);
    //console.log('password', this.form.controls['password'].value);
    event.preventDefault();
     await this.authService.register({ 
      Name: this.form.controls['name'].value,
      Email: this.form.controls['email'].value,
      Password: this.form.controls['password'].value,
      phone_number: this.form.controls['phone_number'].value,
     });
  }

  RegisterFailed() {
    console.log('Register Failed');
    this.dataService.setDidRegister(RegisterStatus.initial);
    this.dataService.setMessageBar({ message: 'Login Credentials are wrong', type: 'danger', duration: 2000 });
  }

  RegisterUser() {
    this.dataService.setMessageBar({ message: 'Logged in!', type: 'info', duration: 1000 });
    this.dataService.setDidRegister(RegisterStatus.initial);
    this.router.navigate(['/login']);
  }
}

export enum RegisterStatus {
  success = 'Completed',
  failed = 'Failed',
  initial = 'Initial'
}