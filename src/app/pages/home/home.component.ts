import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { RpeService } from 'src/app/services/rpe.service';
import { WellnessService } from 'src/app/services/wellness.service';
import { WeightService } from 'src/app/services/weight.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public labelRpe: string;
  public labelDateRpe: string;
  public labelWellness: string;
  public labelDateWellness: string;
  public labelWeight: string;
  public labelDateWeight: string;

   /*chart RPE*/
   public multiRpe: any[];
   public viewRpe: any[] = [350, 400];

   public xAxisLabelRpe: string;
   public yAxisLabelRpe: string;
   public yAxisTicksRpe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   public yScaleMinRpe = 1;
   public yScaleMaxRpe = 10;
   public colorSchemeRpe = {
     domain: ['#283593'],
   };

     /*chart wellness*/
  public multiwellness: any[];
  public viewwellness: any[] = [350, 400];

  public xAxisLabelwellness: string;
  public yAxisLabelwellness: string;
  public colorSchemewellness = {
    domain: ['#283593'],
  };

  /*chart weght*/
  public multiweight: any[];
  public viewweight: any[] = [350, 400];

  public xAxisLabelweight: string;
  public yAxisLabelweight: string;
  public colorSchemeweight = {
    domain: ['#283593'],
  };

   // options for the charts
   public showXAxis = true;
   public showYAxis = true;
   public showLegend = false;
   public gradient = false;
   public showXAxisLabel = true;
   public showYAxisLabel = false;
   public timeline = true;

   // line, area
   public autoScale = true;

   // pie
   public showLabels = true;
   public explodeSlices = false;
   public doughnut = false;

   @ViewChild('resizedDiv', { static: true }) resizedDiv: ElementRef;
   public previousWidthOfResizedDiv = 0;

  constructor(private translate: TranslateService, private rpeservice: RpeService, private wellnessservice: WellnessService,
              private weightservice: WeightService) {

    this.translate.get('label.rpe').subscribe(text => this.labelRpe = text);
    this.translate.get('label.date rpe').subscribe(text => this.labelDateRpe = text);
    this.translate.get('label.wellness').subscribe(text => this.labelWellness = text);
    this.translate.get('label.date wellness').subscribe(text => this.labelDateWellness = text);
    this.translate.get('label.weight').subscribe(text => this.labelWeight = text);
    this.translate.get('label.date weight').subscribe(text => this.labelDateWeight = text);

   }

  ngOnInit() {
    this.rpeservice.getRpes().subscribe(dataRpe => {
      const tabRpe = [];
      let i = dataRpe.length - 1;

      while (i >= 0) {
        tabRpe.push({
          name: dataRpe[i].created_at,
          value: dataRpe[i].mesure
        });
        i--;
      }

      const chart = [
        {
          name: '',
          series: tabRpe
        }];

      this.multiRpe = chart;

      this.xAxisLabelRpe = this.labelDateRpe;
      this.yAxisLabelRpe = this.labelRpe;

      // wellness
      this.wellnessservice.getWellness().subscribe(dataWellness => {
        const tabWellness = [];
        let j = dataWellness.length - 1;
        while (j >= 0) {
          tabWellness.push({
            name: dataWellness[j].created_at,
            value: dataWellness[j].mesure
          });
          j--;
        }

        const chartWellness = [
          {
            name: '',
            series: tabWellness
          }];

        this.multiwellness = chartWellness;

        this.xAxisLabelwellness = this.labelDateWellness;
        this.yAxisLabelwellness = this.labelWellness;

        // weighr
        this.weightservice.getWeight().subscribe(dataWeight => {
          const tabWeight = [];
          for (const d of dataWeight.weight) {
            tabWeight.push({
              name: d.created_at,
              value: d.weight
            });
          }
          const chartWeight = [
            {
              name: '',
              series: tabWeight
            }];

          this.multiweight = chartWeight;

          this.xAxisLabelweight = this.labelDateWeight;
          this.yAxisLabelweight = this.labelWeight;
        });
      });
    });

  }

  public onSelect(event) {
    console.log(event);
  }
}
