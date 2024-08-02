import { Component, Renderer2 } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../services/common/dataservice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-messagebar',
  standalone: true,
  imports: [IxModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  
  subscription: any;
  isDisabled: boolean = true;
  messageOptions: MessageOptions; 


  constructor(
            private dataService: DataService
  ) {
    this.subscription = this.dataService.messageBarObs.subscribe((body) => {
      if(this.messageOptions != null)  {
        this.closeMessage();
      }
        console.log('Body set', body);
        this.messageOptions = body;
        this.openMessage();
      
      
      
      });
  }


  openMessage() {
    console.log("in Message, duration:" + this.messageOptions.duration);
    
    this.isDisabled = false;

    setTimeout(() => {
      
            this.isDisabled = true;
            this.messageOptions = null;
    }, this.messageOptions.duration);
  }

  closeMessage() {
    
    this.isDisabled = true;
    this.messageOptions == null;
  }
}

export class MessageOptions {
    message: string;
    type: string;
    duration: number;
}