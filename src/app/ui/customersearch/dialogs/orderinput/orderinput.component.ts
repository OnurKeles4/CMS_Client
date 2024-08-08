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
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../components/crud_order/addorder/addorder.component';
import { MatSelectModule } from '@angular/material/select';
import { MessageComponent } from '../../../common/message/message.component';
import { DataService } from '../../../../services/common/dataservice';
import { CustomValidators } from '../base/customValidators';

@Component({
  selector: 'app-orderinput',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    IxModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './orderinput.component.html',
  styleUrl: './orderinput.component.scss',
})
export class OrderinputComponent {
  form: FormGroup;
  @Input() selectedProduct: any;

  public orderStatus = OrderStatus;
  constructor(
    public dialogRef: MatDialogRef<OrderinputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private customValidators: CustomValidators
  ) {
    this.form = this.fb.group({
      input1: ['', [customValidators.optionalLengthValidator(2, 100)]],
      input2: ['', [customValidators.optionalLengthValidator(2, 1000)]], //rename these fields accurately later
      input3: ['', [customValidators.optionalLengthValidator(2, 100)]],
      input4: ['', [customValidators.statusValidator()]],
    });

    //console.log('data', this.orderStatus);
  }

  onCancel(): void {
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

  invalidInput(info: string) {
    this.sendMessage({
      message: `Order invalid because of ${info}!`,
      type: 'warning',
      duration: 2000,
    });
    //console.log('invalid input', info);
  }

  sendMessage(body: any) {
    this.dataService.setMessageBar(body);
  }
}
