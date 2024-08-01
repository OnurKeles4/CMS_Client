import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-popupinput',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, IxModule, MatInputModule],
  templateUrl: './popupinput.component.html',
  styleUrl: './popupinput.component.scss'
})
export class PopupInputComponent {
  form: FormGroup;

  @Input() selectedProduct: any;
  constructor(
    public dialogRef: MatDialogRef<PopupInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      input1: [''],
      input2: [''],
      input3: ['']
    });
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
