import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DietService } from './../../services/diet.service';
import { AuthService } from './../../services/auth.service';

import { Diet } from './../../models/diet';
import { Partdiet } from './../../models/partdiet';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss'],
})
export class DietComponent implements OnInit {

  public diet: Diet = new Diet();
  public partdiets: Partdiet[] = [];
  public menus: any;
  public nameCoach: string;
  private carbohydrates: string;
  private fat: string;
  private protein: string;

  /*chart */
  public view: any[] = [250, 250];
  public single: any[] = [];

  // options for the chart
  public gradient = false;
  public legend = true;
  public legendPosition = 'below';
  public colorScheme = {
    domain: ['rgba(51, 78, 255)', 'rgba(255,51,63)', 'rgba(51, 255, 93)'],
  };

  @ViewChild('resizedDiv', { static: true }) resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;
  constructor(private dietservice: DietService,  private authservice: AuthService, private translate: TranslateService) {
    this.translate.get('nutrition.carbohydrates').subscribe(text => this.carbohydrates = text);
    this.translate.get('nutrition.fat').subscribe(text => this.fat = text);
    this.translate.get('nutrition.protein').subscribe(text => this.protein = text);

  }

  ngOnInit() {
    this.dietservice.getDiet().subscribe(data => {

      this.diet = data.diet;
      this.partdiets = data.partdiets;
      this.menus = data.foods;

      this.nameCoach = this.authservice.trainer.name + ' ' + this.authservice.trainer.surname;

      let tab = [];
      let total: number;
      let carbohydratesper: number;
      let fatper: number;
      let protper: number;
      this.partdiets.forEach(item => {
        total = item.carbohydrates + item.fat + item.protein;
        carbohydratesper = Math.floor((item.carbohydrates / total) * 100);
        fatper = Math.floor((item.fat / total) * 100);
        protper = Math.floor((item.protein / total) * 100);
        tab = [{name: this.carbohydrates, value: carbohydratesper}, {name: this.fat, value: fatper}, {name: this.protein, value: protper}];
        this.single.push(tab);
      });
    });
  }

  public onSelect(event: any) {
    console.log(event);
  }

}
