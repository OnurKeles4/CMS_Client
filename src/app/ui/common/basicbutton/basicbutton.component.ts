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
  styleUrl: './basicbutton.component.scss',
})
export class BasicbuttonComponent implements OnDestroy {
  showSpinner: boolean = false;
  @Input() isDisabled: boolean = true;
  @Input() label: string;
  @Input() icon: any;
  attempt: boolean = true;
  subscription: any;
  constructor(private dataService: DataService) {

    this.subscription = this.dataService.refreshObs.subscribe((data) => {
      this.showSpinner = data;
      //console.log('showSpinner has been set', this.showSpinner);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
