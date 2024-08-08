import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { MessageComponent } from './ui/common/message/message.component';
import { AuthService } from './ui/login/auth/auth.service';
import { DataService } from './services/common/dataservice';
import { SafetyCheckComponent } from './ui/customersearch/dialogs/safetycheck/safetycheck.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IxModule,
    RouterModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDisabled: boolean = false;
  title = 'CMS_Client';
  constructor(
    private authService: AuthService,
    private dataService: DataService,

    public dialog: MatDialog
  ) {
    this.dataService.didLoginObs.subscribe((data) => {
      //console.log('data', data);

      this.isDisabled = data;
    });
  }

  //  Disable() {
  //   this.isDisabled = !this.isDisabled;
  //  }
  logOut() {
    const dialogRef = this.dialog.open(SafetyCheckComponent, {
      width: '300px',
      data: {
        title: 'Log Out',
        description: 'You sure you want to log out?',
      },
    });
  }
}
