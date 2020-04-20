import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Element {
  position: number;
  name: string;
}


@Injectable()
export class TablesService {

  public borg0: string;
  public borg1: string;
  public borg2: string;
  public borg3: string;
  public borg4: string;
  public borg5: string;
  public borg6: string;
  public borg7: string;
  public borg8: string;
  public borg9: string;
  public borg10: string;

  constructor(private translate: TranslateService) {
    this.translate.get('borg.no effort').subscribe(text => this.borg0 = text);
    this.translate.get('borg.very very easy').subscribe(text => this.borg1 = text);
    this.translate.get('borg.very easy').subscribe(text => this.borg2 = text);
    this.translate.get('borg.easy').subscribe(text => this.borg3 = text);
    this.translate.get('borg.moderate effort').subscribe(text => this.borg4 = text);
    this.translate.get('borg.medium').subscribe(text => this.borg5 = text);
    this.translate.get('borg.a little hard').subscribe(text => this.borg6 = text);
    this.translate.get('borg.hard').subscribe(text => this.borg7 = text);
    this.translate.get('borg.very hard').subscribe(text => this.borg8 = text);
    this.translate.get('borg.very very hard').subscribe(text => this.borg9 = text);
    this.translate.get('borg.maximum').subscribe(text => this.borg10 = text);
   }

  getData() {
    const data: Element[] = [
      {position: 0, name: this.borg0},
      {position: 1, name: this.borg1},
      {position: 2, name: this.borg2},
      {position: 3, name: this.borg3},
      {position: 4, name: this.borg4},
      {position: 5, name: this.borg5},
      {position: 6, name: this.borg6},
      {position: 7, name: this.borg7},
      {position: 8, name: this.borg8},
      {position: 9, name: this.borg9},
      {position: 10, name: this.borg10},
    ];
    return data;
  }
}
