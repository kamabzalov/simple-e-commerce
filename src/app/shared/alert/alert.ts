import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  imports: [TranslatePipe],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  public alertText = input.required<string>();
}
