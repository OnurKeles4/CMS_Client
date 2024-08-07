import { Component, Inject, inject } from '@angular/core';
//import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //authService = inject(AuthService);
  form: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login(event: Event) {
    console.log('Loggin Attempt');

    console.log('email', this.form.controls['email'].value);
    console.log('password', this.form.controls['password'].value);
    event.preventDefault();
     this.authService.login({ email: this.form.controls['email'].value,
        password: this.form.controls['password'].value }).subscribe((r) => {
       console.log('Logged in', r);
       this.router.navigate(['/']);
     });
  }
}
