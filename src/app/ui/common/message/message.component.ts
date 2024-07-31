import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [IxModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

}
