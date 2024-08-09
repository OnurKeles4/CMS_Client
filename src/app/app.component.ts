import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { MessageComponent } from './ui/common/message/message.component';
import { AuthService } from './ui/login/auth/auth.service';
import { DataService } from './services/common/dataservice';
import { SafetyCheckComponent } from './ui/customersearch/dialogs/safetycheck/safetycheck.component';
import { MatDialog } from '@angular/material/dialog';
import  { Router } from '@angular/router';
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
  isLogginOut: boolean = false;

  router = inject(Router);
  constructor(
    private dataService: DataService,

    public dialog: MatDialog
  ) {
    this.dataService.didLoginObs.subscribe((data) => {
      //console.log('data', data);

      this.isDisabled = data;
    });
  }

  routeTo(route: string) {
  switch (route) {
    case 'home':
      this.home();
      break;
    case 'customersearch':
      this.customerSearch();
      break;
    case 'logout':
      this.logOut();
      break;
  }

}
home() {
  if(this.router.url == '/')
    return null;
  this.router.navigate(['/']);
}

customerSearch() {      
                //make this function in dataservice
      if(this.router.url == '/customersearch')
        return null;
      
  this.dataService.setInitial();                      
  this.router.navigate(['/customersearch']);
}

  
  logOut() {
    this.dataService.setDidLogin(false);
    const dialogRef = this.dialog.open(SafetyCheckComponent, {
      width: '300px',
      data: {
        title: 'Log Out',
        description: 'You sure you want to log out?',
      },
      disableClose: true,
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      backdropClass: 'backdrop',
      hasBackdrop: true,
    });
  }
}
