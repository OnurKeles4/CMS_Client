import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../../services/common/dataservice';
import { CustomValidators } from '../../../customersearch/dialogs/base/customValidators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IxModule, RouterModule,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: any;
  router = Inject(Router);
  didLogin: boolean = false;
  constructor(private fb: FormBuilder, private dataService: DataService,
     customValidators: CustomValidators) {
     this.dataService.didLoginObs.subscribe((data) => {
    this.didLogin = data; 
    }); 
    this.form = this.fb.group({
      name: ['', [customValidators.optionalLengthValidator(2,100)]],
      email: ['', [customValidators.optionalLengthValidator(5,100), customValidators.EmailValidator()]],                                   //rename these fields accurately later
      password: ['', [customValidators.optionalLengthValidator(8,100)]],
      phone_number: ['', [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)]],
      });
  }

  goBack() {
    
  this.router.navigate(['/login']);
  }
}
