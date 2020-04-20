import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

import * as AppConfig from '../config';
import swal from 'sweetalert2';

@Injectable()
export class UserService {

  private cfg: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.cfg = AppConfig.cfg;
  }

  update(user: any): Observable<any> {

    return this.http.put(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.client, user).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.message);
        swal.fire('Error to create user', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.client);
  }
}
