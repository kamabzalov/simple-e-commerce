import { Component, inject, model, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  protected lang = model<string>('');
  private translateService = inject(TranslateService);

  ngOnInit() {
    this.lang.set(this.translateService.getCurrentLang() ?? 'en');
  }

  protected changeLanguage($event: string) {
    this.lang.set($event);
    this.translateService.use($event);
  }
}
