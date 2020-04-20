import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppConfig from '../config';

import { Wellness } from '../models/wellness';

@Injectable()
export class WellnessService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getWellness(): Observable<Wellness[]> {
    return this.http.get<Wellness[]>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.wellness);
  }

  setWellness(wellness: string): Observable<any> {
    const params = {wellness};
    return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.wellness, params);
  }
}
