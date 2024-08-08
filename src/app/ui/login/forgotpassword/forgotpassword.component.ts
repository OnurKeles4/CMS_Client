import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IxModule } from '@siemens/ix-angular';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../../services/common/dataservice';
import { CustomValidators } from '../../customersearch/dialogs/base/customValidators';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [IxModule, RouterModule, RouterOutlet],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  form: any;
  router = inject(Router);
  didLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    customValidators: CustomValidators
  ) {
    this.dataService.didLoginObs.subscribe((data) => {
      this.didLogin = data;
    });
    this.dataService.setDidLogin(false);
    this.form = this.fb.group({
      name: ['', [customValidators.optionalLengthValidator(2, 100)]],
      email: [
        '',
        [
          customValidators.optionalLengthValidator(5, 100),
          customValidators.EmailValidator(),
        ],
      ], //rename these fields accurately later
      password: ['', [customValidators.optionalLengthValidator(8, 100)]],
      phone_number: [
        '',
        [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)],
      ],
    });
  }

  goBack() {
    //console.log('Going back');
    this.router.navigate(['/login']);
  }
}
