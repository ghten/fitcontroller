import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import {TranslateService} from '@ngx-translate/core';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private error_unauthorized;
  private error_access_denied;

  constructor(private authservice: AuthService, private router: Router, private translate: TranslateService) {
    this.translate.get('alert-error.unauthorized').subscribe(text => this.error_unauthorized = text);
    this.translate.get('alert-error.access_denied').subscribe(text => this.error_access_denied = text);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          swal.fire('Error', this.error_unauthorized, 'warning');
          if (this.authservice.isAuthenticated()) {
            this.authservice.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status === 403) {
          swal.fire('Error', this.error_access_denied, 'warning');
          this.authservice.logout();
          this.router.navigate(['/login']);
        }

        return throwError(e);
      })
    );
  }
}
