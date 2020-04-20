import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  private error_active: string;
  private error_access: string;

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {  
    this.translate.get('alert-error.you dont have access to this application').subscribe(text => this.error_active = text);
    this.translate.get('alert-error.access denied').subscribe(text => this.error_access = text);
  }

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.user.active) {
      this.authService.logout();
      swal.fire(this.error_access, this.error_active, 'warning');
      this.router.navigate(['/login']);
		  return false;
    }
    return true;
  }
}