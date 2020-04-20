import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
