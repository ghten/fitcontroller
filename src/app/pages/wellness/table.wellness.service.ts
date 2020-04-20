import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Element {
  position: number;
  name: string;
}


@Injectable()
export class TablesWellnessService {

  public sensation1: string;
  public sensation3: string;
  public sensation5: string;
  public sensation8: string;
  public sensation10: string;

  public mood1: string;
  public mood3: string;
  public mood5: string;
  public mood8: string;
  public mood10: string;

  public sleep1: string;
  public sleep3: string;
  public sleep5: string;
  public sleep8: string;
  public sleep10: string;


  constructor(private translate: TranslateService) {
    this.translate.get('sensation.in the top').subscribe(text => this.sensation1 = text);
    this.translate.get('sensation.OK it is fine').subscribe(text => this.sensation3 = text);
    this.translate.get('sensation.variable').subscribe(text => this.sensation5 = text);
    this.translate.get('sensation.not too much').subscribe(text => this.sensation8 = text);
    this.translate.get('sensation.exhausted, not taste').subscribe(text => this.sensation10 = text);

    this.translate.get('mood.very good mood').subscribe(text => this.mood1 = text);
    this.translate.get('mood.good').subscribe(text => this.mood3 = text);
    this.translate.get('mood.relaxed').subscribe(text => this.mood5 = text);
    this.translate.get('mood.stressed').subscribe(text => this.mood8 = text);
    this.translate.get('mood.depressed').subscribe(text => this.mood10 = text);

    this.translate.get('sleep.great').subscribe(text => this.sleep1 = text);
    this.translate.get('sleep.normal').subscribe(text => this.sleep3 = text);
    this.translate.get('sleep.not enough').subscribe(text => this.sleep5 = text);
    this.translate.get('sleep.too few').subscribe(text => this.sleep8 = text);
    this.translate.get('sleep.horror (cannot sleep)').subscribe(text => this.sleep10 = text);

   }

  getSensation() {
    const data: Element[] = [
      {position: 1, name: this.sensation1},
      {position: 3, name: this.sensation3},
      {position: 5, name: this.sensation5},
      {position: 8, name: this.sensation8},
      {position: 10, name: this.sensation10},
    ];
    return data;
  }

  getMood() {
    const data: Element[] = [
      {position: 1, name: this.mood1},
      {position: 3, name: this.mood3},
      {position: 5, name: this.mood5},
      {position: 8, name: this.mood8},
      {position: 10, name: this.mood10},
    ];
    return data;
  }

  getSleep() {
    const data: Element[] = [
      {position: 1, name: this.sleep1},
      {position: 3, name: this.sleep3},
      {position: 5, name: this.sleep5},
      {position: 8, name: this.sleep8},
      {position: 10, name: this.sleep10},
    ];
    return data;
  }
}
