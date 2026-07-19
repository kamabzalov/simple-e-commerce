import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  imports: [RouterOutlet, Header, RouterLink, TranslatePipe],
  templateUrl: './shop.html',
})
export class Shop {}
