import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppConfig from '../config';

@Injectable()
export class TrainingService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getTraining(): Observable<any> {
    let data = {lang_id: sessionStorage.getItem('langid')};
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.training, {params: data});
  }
}
