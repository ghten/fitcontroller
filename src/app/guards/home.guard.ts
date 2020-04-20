import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

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

      this.router.navigate(['/login']);
      return false;
  }
}
