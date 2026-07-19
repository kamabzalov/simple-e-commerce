import { Component, injectAsync } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [Header, RouterLink, TranslatePipe, RouterOutlet],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private router = injectAsync(() => import('@angular/router').then(s => s.Router));

  protected async logout() {
    localStorage.removeItem('token');
    const router = await this.router();
    await router.navigate(['/']);
  }
}
