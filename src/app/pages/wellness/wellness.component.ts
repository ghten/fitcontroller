import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { WellnessService } from '../../services/wellness.service';

import { TablesWellnessService } from './table.wellness.service';

@Component({
  selector: 'app-wellness',
  templateUrl: './wellness.component.html',
  styleUrls: ['./wellness.component.scss']
})
export class WellnessComponent implements OnInit {

  wellnessForm: FormGroup;
  public labelWellness: string;
  public labelDate: string;
  public sensations: any;
  public moods: any;
  public sleeps: any;

  /*chart */
  public multi: any[];
  public view: any[] = [350, 400];

  // options for the chart
  public showXAxis = true;
  public showYAxis = true;
  public showLegend = false;
  public gradient = false;
  public showXAxisLabel = true;
  public xAxisLabel: string;
  public showYAxisLabel = false;
  public yAxisLabel: string;
  public timeline = true;
  public colorScheme = {
    domain: ['#283593'],
  };

  // line, area
  public autoScale = true;
  // pie
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;

  @ViewChild('resizedDiv', { static: true }) resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;

  constructor(private wellnessservice: WellnessService, private formBuilder: FormBuilder, private router: Router,
              private translate: TranslateService, private tablesService: TablesWellnessService) {

    this.wellnessForm = this.formBuilder.group({
      fsensation: ['', Validators.required],
      fmood: ['', Validators.required],
      fsleep: ['', Validators.required]
    });

    this.translate.get('label.wellness').subscribe(text => this.labelWellness = text);
    this.translate.get('label.date wellness').subscribe(text => this.labelDate = text);
    this.sensations = this.tablesService.getSensation();
    this.moods = this.tablesService.getMood();
    this.sleeps = this.tablesService.getSleep();
   }

  ngOnInit() {
    this.wellnessservice.getWellness().subscribe(data => {
      const tab = [];
      let i = data.length - 1;
      while (i >= 0) {
        tab.push({
          name: data[i].created_at,
          value: data[i].mesure
        });
        i--;
      }

      const chart = [
        {
          name: '',
          series: tab
        }];

      this.multi = chart;

      this.xAxisLabel = this.labelDate;
      this.yAxisLabel = this.labelWellness;

    });
  }

  onSubmit(values: any) {

    const data = (values.fsensation + values.fmood + values.fsleep) / 3;

    this.wellnessservice.setWellness(data.toFixed(1)).subscribe( data => {
      this.router.navigate(['/home']);
    });

  }

  public onSelect(event) {
    console.log(event);
  }
}
