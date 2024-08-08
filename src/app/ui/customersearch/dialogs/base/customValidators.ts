import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  optionalLengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const length = value.length;
      if (length < minLength || length > maxLength) {
        return {
          optionalLength: { minLength, maxLength, actualLength: length },
          errorText: 'Wrong character amount!',
        };
      }

      return null;
    };
  }

  PhoneValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const isValid = pattern.test(value);
      if (!isValid) {
        return {
          optionalPattern: {
            requiredPattern: pattern.toString(),
            actualValue: value,
          },
          errorText: 'Wrong phone number format!',
        };
      }
      return null;
    };
  }
  EmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      var validEmail = new FormControl(value, Validators.email);

      //console.log('validemail', validEmail);
      //console.log('value', value);

      if (!validEmail) {
        return { errorText: 'Wrong email format!' };
      }
      return null;
    };
  }

  statusValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    };
  }
}
