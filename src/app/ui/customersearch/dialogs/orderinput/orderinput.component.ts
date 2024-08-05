import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../components/crud_order/addorder/addorder.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-orderinput',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, IxModule, MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './orderinput.component.html',
  styleUrl: './orderinput.component.scss'
})
export class OrderinputComponent{
  form: FormGroup;
  @Input() selectedProduct: any;

  public orderStatus = OrderStatus;
  constructor(
    public dialogRef: MatDialogRef<OrderinputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {

    

    this.form = this.fb.group({
      input1: [''],
      input2: [''],
      input3: [''],
      input4: [''],
    });

    console.log('data', this.orderStatus);
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {

      this.dialogRef.close(this.form.value);

    }
  }

}
