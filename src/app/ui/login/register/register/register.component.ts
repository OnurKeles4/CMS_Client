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
  imports: [IxModule, RouterModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: any;
  router = inject(Router);
  didSign: string = '';
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    customValidators: CustomValidators,
    private authService: AuthService
  ) {
    this.dataService.didSignObs.subscribe((data) => {
      if (data == SignStatus.success) {
        console.log('Register Succeedd');

        this.didSign = data;
        this.RegisterUser();
      } else if (data == SignStatus.failed) {
        this.RegisterFailed();
      }
    });

    this.dataService.setDidLogin(false);
    this.form = this.fb.group({
      name: ['Onur Keleş', [customValidators.optionalLengthValidator(2, 100)]],
      email: [
        'qqqq@qqq.com',
        [
          customValidators.optionalLengthValidator(5, 100),
          customValidators.EmailValidator(),
        ],
      ], //rename these fields accurately later
      password: [
        '1234512345',
        [customValidators.optionalLengthValidator(8, 100)],
      ],
      phone_number: [
        '123 123 1234',
        [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)],
      ],
    });
  }

  goBack() {
    console.log('Going back');
    this.router.navigate(['/login']);
  }

  async registerUser(event: Event) {
    console.log('Register Attempt');
    var a: SignStatus = SignStatus.failed;

    event.preventDefault();
    this.authService
      .register({
        Name: this.form.controls['name'].value,
        Email: this.form.controls['email'].value,
        Password: this.form.controls['password'].value,
        phone_number: this.form.controls['phone_number'].value,
      })
      .subscribe((r) => {
        a = SignStatus.success;
        this.dataService.setDidSign(SignStatus.success);
      })
      .add(() => {
        console.log('Register Status at add', a);

        if (a == SignStatus.failed) {
          this.dataService.setDidSign(SignStatus.failed);
        }
      });
  }

  RegisterFailed(): SignStatus {
    console.log('Register Failed');
    this.dataService.setDidSign(SignStatus.initial);
    this.dataService.setMessageBar({
      message: 'Register Credentials are wrong',
      type: 'danger',
      duration: 2000,
    });
    return SignStatus.failed;
  }

  RegisterUser(): SignStatus {
    console.log('Register Succeedd');
    this.dataService.setMessageBar({
      message: 'Registered!',
      type: 'info',
      duration: 1000,
    });
    this.dataService.setDidSign(SignStatus.initial);
    this.router.navigate(['/login']);
    return SignStatus.success;
  }
}

export enum SignStatus {
  success = 'Completed',
  failed = 'Failed',
  initial = 'Initial',
}
