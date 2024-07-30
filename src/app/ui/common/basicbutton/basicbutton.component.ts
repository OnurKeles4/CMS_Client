import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IxModule, IxSpinner } from '@siemens/ix-angular';
import { DataService } from '../../../services/common/dataservice';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-basicbutton',
  standalone: true,
  imports: [IxModule, CommonModule, FontAwesomeModule],
  templateUrl: './basicbutton.component.html',
  styleUrl: './basicbutton.component.scss'
})
export class BasicbuttonComponent implements OnDestroy {  
  showSpinner: boolean = false;
  isDisabled: boolean = true;
  @Input() label: string;
  @Input() icon: any;
  attempt: boolean = true;
  subscription: any;
  constructor(private dataService: DataService) {
    this.subscription = this.dataService.isDisabledObs.subscribe(data => {
      this.isDisabled = data;
      console.log("Isdisabled has been set", this.isDisabled);
      
    });

    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

    // active() {
    //   this.attempt = false;
    // //console.log("SPIN STARTED");
    // this.showSpinner = true;
    // //this.isDisabled = true;
    // setTimeout(() => {
    
    //   //console.log("SPIN STOPPED");    
    //     this.showSpinner = false;
    //     this.dataService.setRefresh(false);
    //     //this.isDisabled = true;
    // }, 0);
    // }
  }

