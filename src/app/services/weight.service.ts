import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppConfig from '../config';

import { Weight } from '../models/weight';

@Injectable()
export class WeightService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getWeight(): Observable<any> {
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.weight);
  }

  setWeight(weight: any): Observable<any> {
    return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.weight, weight);
  }

  Delete(weight: Weight) {
    let data = {weight: JSON.stringify(weight)};

    return this.http.delete<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.weight, {params: data});
  }
}
