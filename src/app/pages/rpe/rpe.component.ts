import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material';

import { RpeService } from '../../services/rpe.service';

import { TablesService, Element } from './tables.service';

import { Rpe } from '../../models/rpe';

@Component({
  selector: 'app-rpe',
  templateUrl: './rpe.component.html',
  styleUrls: ['./rpe.component.scss']
})
export class RpeComponent implements OnInit {

  public rpes: Rpe[];
  rpeForm: FormGroup;
  public labelRpe: string;
  public labelDate: string;
  public displayedColumns = ['position', 'name'];
  public dataSource: any;

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
  public yAxisTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public yScaleMin = 1;
  public yScaleMax = 10;
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

  constructor(private rpeservice: RpeService, private formBuilder: FormBuilder, private router: Router, 
              private translate: TranslateService, private tablesService: TablesService) {

    this.rpeForm = this.formBuilder.group({
      mesure: ['', Validators.compose([Validators.required, Validators.max(10), Validators.min(1)])]
    });

    this.translate.get('label.rpe').subscribe(text => this.labelRpe = text);
    this.translate.get('label.date rpe').subscribe(text => this.labelDate = text);
    this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());

   }

  ngOnInit() {
    this.rpeservice.getRpes().subscribe(data => {
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
      this.yAxisLabel = this.labelRpe;

    });
  }

  onSubmit(values: any) {

    this.rpeservice.setRpe(values.mesure).subscribe( data => {
      this.router.navigate(['/home']);
    });

  }

  public onSelect(event) {
    console.log(event);
  }
}
