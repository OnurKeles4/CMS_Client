import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IxModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CMS_Client';
}
