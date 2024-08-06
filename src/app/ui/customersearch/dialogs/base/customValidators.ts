import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
    providedIn: 'root'
  })
export class CustomValidators {
    optionalLengthValidator(minLength: number, maxLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (!value) {
            // If the value is empty, it's valid
            return null;
          }
      
          const length = value.length;
          if (length < minLength || length > maxLength) {
            // If the value's length is outside the specified range, return an error
            return { optionalLength: { minLength, maxLength, actualLength: length } };
          }
      
          // If the value's length is within the range, it's valid
          return null;
        };
      }  
      PhoneValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (!value) {
            // If the value is empty, it's valid
            return null;
          }
      
          //    ADD PATTERN CONDITION TO HERE
      
          // If the value's length is within the range, it's valid
          return null;
        };
      }  
} 