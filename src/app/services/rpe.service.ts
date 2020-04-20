import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppConfig from '../config';

import { Rpe } from '../models/rpe';

@Injectable()
export class RpeService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getRpes(): Observable<Rpe[]> {
    return this.http.get<Rpe[]>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.rpe);
  }

  setRpe(rpe: string): Observable<any> {
    return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.rpe, rpe);
  }
}
