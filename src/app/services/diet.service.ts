import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as AppConfig from '../config';
import swal from 'sweetalert2';

@Injectable()
export class DietService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getDiet(): Observable<any> {
    let data = {lang_id: sessionStorage.getItem('langid')};
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.diet, {params: data});
  }
}
