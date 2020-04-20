import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import swal from 'sweetalert2';

import * as AppConfig from './../../config';

import { WeightService } from '../../services/weight.service';
import { AuthService } from './../../services/auth.service';

import { Weight } from '../../models/weight';

@Component({
  selector: 'app-see-weight',
  templateUrl: './see-weight.component.html',
  styleUrls: ['./see-weight.component.scss']
})
export class SeeWeightComponent implements OnInit {

  public weight: Weight;
  public photo: boolean;
  public urlPhoto;
  private cfg: any;
  public datePhoto: string;
  private titleAlert: string;
  private textAlert: string;
  private buttonYes: string;
  private buttonNo: string;
  public labelWeight: string;
  public labelDate: string;

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

  constructor(private weightservice: WeightService, private router: Router, private authservice: AuthService,
              private translate: TranslateService) {
    this.photo = false;
    this.cfg = AppConfig.cfg;
    this.weight = new Weight();

    /********translate*******************************************************/
    this.translate.get('message.Are you sure?').subscribe(text => this.titleAlert = text);
    this.translate.get('message.You wont be able to revert this!').subscribe(text => this.textAlert = text);
    this.translate.get('button.Yes, delete it!').subscribe(text => this.buttonYes = text);
    this.translate.get('button.No, cancel!').subscribe(text => this.buttonNo = text);
    this.translate.get('label.weight').subscribe(text => this.labelWeight = text);
    this.translate.get('label.date weight').subscribe(text => this.labelDate = text);
  }

  ngOnInit() {
    this.weightservice.getWeight().subscribe(data => {
      const tab = [];
      for (const d of data.weight) {
        tab.push({
          name: d.created_at,
          value: d.weight
        });
      }
      const chart = [
        {
          name: '',
          series: tab
        }];

      this.multi = chart;
      this.weight = data.lastweight;
      if (this.weight.photo.length > 0) {
        this.photo = true;
        this.urlPhoto = this.cfg.photo_url + this.authservice.user.id + '/' + this.weight.photo;
        this.datePhoto = this.filter(this.weight.photo_date);
      }

      this.xAxisLabel = this.labelDate;
      this.yAxisLabel = this.labelWeight;
    });
  }

  filter(photoDate) {
    let year = '';
    let month = '';
    let day = '';

    let i = 0;
    while (i < 4) { year += photoDate.charAt(i); i++; }
    while (i < 6) { month += photoDate.charAt(i); i++; }
    while (i < 8) { day += photoDate.charAt(i); i++; }

    return year + '/' + month + '/' + day;
  }

  remove() {
    swal.fire({
      title: this.titleAlert,
      text: this.textAlert,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.buttonYes,
      cancelButtonText: this.buttonNo,
    }).then((result) => {
      if (result.value) {
        this.weightservice.Delete(this.weight).subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  public onSelect(event) {
    console.log(event);
  }

}
