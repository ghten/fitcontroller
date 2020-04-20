import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private error_resource: string;
  private error_access: string;

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.translate.get('alert-error.you dont have access to this resource').subscribe(text => this.error_resource = text);
    this.translate.get('alert-error.access denied').subscribe(text => this.error_access = text);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }

      const role = next.data['role'] as string;
      if (this.authService.hasRole(role)) {
        return true;
      }
      swal.fire(this.error_access, this.error_resource, 'warning');
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
  }
}
