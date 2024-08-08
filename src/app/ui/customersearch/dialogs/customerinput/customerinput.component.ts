import {
  Component,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../../common/message/message.component';
import { DataService } from '../../../../services/common/dataservice';
import { CustomValidators } from '../base/customValidators';

@Component({
  selector: 'app-customerinput',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    IxModule,
    MatInputModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './customerinput.component.html',
  styleUrl: './customerinput.component.scss',
})
export class CustomerInputComponent {
  form: FormGroup;
  isValid: boolean = false;
  @Input() selectedProduct: any;
  constructor(
    public dialogRef: MatDialogRef<CustomerInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private customValidators: CustomValidators
  ) {
    this.form = this.fb.group({
      input1: ['', [customValidators.optionalLengthValidator(2, 100)]],
      input2: [
        '',
        [
          customValidators.optionalLengthValidator(5, 100),
          customValidators.EmailValidator(),
        ],
      ], //rename these fields accurately later
      input3: [
        '',
        [customValidators.PhoneValidator(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)],
      ],
    });
    // WORK IN PROGRESS PART,REMINDER FOR CONTINUING NEXT DAY!!!!!!!1
  }

  onCancel(): void {
    
    this.dataService.setDidLogin(true);
    this.dialogRef.close();
  }

  onSubmit(): void {
    var str = '';
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      for (let control in this.form.controls) {
        if (this.form.controls[control].errors != undefined) {
          //console.log('invalid input', this.form.controls[control].errors);
          str += this.form.controls[control].errors['errorText'] + ' ';
        }
        //console.log(str);
      }

      this.dataService.setMessageBar({
        message: `Customer invalid because of ${str}!`,
        type: 'warning',
        duration: 10000,
      });
      // //console.log('invalid input', this.form.controls['input1'].errors);
      // //console.log('invalid input', this.form.controls['input2'].errors);
      // //console.log('invalid input', this.form.controls['input3'].errors);
    }
  }

  notValid() {
    this.isValid = false;
  }

  invalidInfo() {}
}
