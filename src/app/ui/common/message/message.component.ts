import { Component, Renderer2 } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { DataService } from '../../../services/common/dataservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messagebar',
  standalone: true,
  imports: [IxModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  subscription: any;
  isDisabled: boolean = true;
  messageOptions: MessageOptions;

  private timeoutId: any;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.messageBarObs.subscribe((body) => {
      if (this.timeoutId) {
        this.closeMessage();
      }
      //console.log('Body set', body);
      if(body !=null ) {
      this.messageOptions = body;
      this.openMessage();
      }
    });
  }

  openMessage() {
    //console.log('in Message, duration:' + this.messageOptions.duration);

    this.isDisabled = false;

    this.timeoutId = setTimeout(() => {
      this.isDisabled = true;
      this.messageOptions = null;
    }, this.messageOptions.duration);
  }

  closeMessage() {
    clearTimeout(this.timeoutId);
    this.isDisabled = true;
    
    this.messageOptions == null;
  }
}

export class MessageOptions {
  message: string = '';
  type: string = 'none';
  duration: number = 0;
}
