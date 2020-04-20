import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppConfig from '../config';

import { Rpe } from '../models/rpe';

@Injectable()
export class AdviceService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getAdvice(): Observable<any> {
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.advice);
  }
}
