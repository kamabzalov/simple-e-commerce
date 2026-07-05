import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-shop',
  imports: [RouterOutlet, Header],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {}
