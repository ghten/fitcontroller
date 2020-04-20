import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Lang } from '../models/lang';

import * as AppConfig from '../config';

@Injectable()
export class LangService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getLangs(): Observable<Lang[]> {
    return this.http.get<Lang[]>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.langs);
  }

  getLang(codelang: string): Observable<number> {
    let data = {code: codelang};
    return this.http.get<number>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.lang, {params: data});
  }
}
