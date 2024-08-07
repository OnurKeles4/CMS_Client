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
  didLogin: boolean = false;
  constructor(private fb: FormBuilder, private dataService: DataService,
     customValidators: CustomValidators, private authService : AuthService) {
     this.dataService.didLoginObs.subscribe((data) => {
    this.didLogin = data; 
    }); 
    this.dataService.setDidLogin(false);
    this.form = this.fb.group({
      name: ['', [customValidators.optionalLengthValidator(2,100)]],
      email: ['', [customValidators.optionalLengthValidator(5,100), customValidators.EmailValidator()]],                                   //rename these fields accurately later
      password: ['', [customValidators.optionalLengthValidator(8,100)]],
      phone_number: ['', [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)]],
      });
  }

  goBack() {
    console.log('Going back');
  this.router.navigate(['/login']);
  }

  registerUser(event: Event) {
    console.log('Register Attempt');

    console.log('email', this.form.controls['email'].value);
    console.log('password', this.form.controls['password'].value);
    event.preventDefault();
     this.authService.register({ 
      Name: this.form.controls['name'].value,
      Email: this.form.controls['email'].value,
      Password: this.form.controls['password'].value,
      PhoneNumber: this.form.controls['phone_number'].value,
     })
//      .subscribe((r) => {
//       this.dataService.setDidLogin(true);
      
//    console.log('Registered in', r);
//    this.dataService.setMessageBar({ message: 'Logged in!', type: 'info', duration: 1000 });
//    this.router.navigate(['/']);
//  });
     if(!this.didLogin) {
      this.dataService.setMessageBar({ message: 'Login Credentials are wrong', type: 'danger', duration: 2000 });
     }
  }
}
