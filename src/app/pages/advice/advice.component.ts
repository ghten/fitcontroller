import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import swal from 'sweetalert2';

import * as AppConfig from '../../config';

import { AdviceService } from './../../services/advive.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-advicet',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {

  public advice: string;

  constructor(private adviceservice: AdviceService, private router: Router, private authservice: AuthService,
              private translate: TranslateService) {}

  ngOnInit() {
    this.adviceservice.getAdvice().subscribe(data => {
      this.advice = data.advice;
    });
  }
}
