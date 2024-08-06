import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from "../../../common/message/message.component";
import { DataService } from '../../../../services/common/dataservice';

@Component({
  selector: 'app-customerinput',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, IxModule, MatInputModule, CommonModule, MessageComponent],
  templateUrl: './customerinput.component.html',
  styleUrl: './customerinput.component.scss'
})
export class PopupInputComponent {
  form: FormGroup;
  isValid :boolean = false;
  @Input() selectedProduct: any;
  constructor(
    public dialogRef: MatDialogRef<PopupInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      input1: ['', [Validators.minLength(2), Validators.maxLength(100), Validators.name]],
      input2: ['', [Validators.minLength(5), Validators.maxLength(100), Validators.email]],                                   //rename these fields accurately later
      input3: ['', [Validators.pattern("[0-9]{3} [0-9]{3} [0-9]{4}")]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
    else {
      this.dataService.setMessageBar({message: `Customer invalid because of ...!`, type: 'warning', duration: 2000});
      console.log('invalid input', this.form.controls['input1'].errors);
      console.log('invalid input', this.form.controls['input2'].errors);
      console.log('invalid input', this.form.controls['input3'].errors);
    }
  }

  notValid() {
    this.isValid = false;
  }

  

  invalidInfo() {
    
  }

}
