import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from "../../../common/message/message.component";
import { DataService } from '../../../../services/common/dataservice';
import { CustomValidators } from '../base/customValidators';
import { AuthService } from '../../../login/auth/auth.service';

@Component({
  selector: 'app-safetycheck',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, IxModule, MatInputModule, CommonModule,
     MessageComponent],
  templateUrl: './safetycheck.component.html',
  styleUrl: './safetycheck.component.scss'
})
export class SafetyCheckComponent {

  isValid :boolean = false;
  @Input() selectedProduct: any;
  constructor(
    public dialogRef: MatDialogRef<SafetyCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private authService: AuthService,
  ) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
  this.dataService.setMessageBar({message: `Logged out`, type: 'info', duration: 3000});
      
  this.dataService.setDidLogin(false);
  this.authService.logout();
  this.dialogRef.close();
  }

  notValid() {
    this.isValid = false;
  }

  invalidInfo() {
    
  }

}
