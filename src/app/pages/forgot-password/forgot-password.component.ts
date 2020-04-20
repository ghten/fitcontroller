import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';

import { Settings } from '../../app.settings.model';
import { AppSettings } from '../../app.settings';

import swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private error_email: string;
  private message_password: string;
  private information: string;
  public settings: Settings


  forgotForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authservice: AuthService,
    private translate: TranslateService, private router: Router, public appSettings:AppSettings) {
      this.settings = this.appSettings.settings; 
    }

  ngOnInit() {
    this.translate.get('error.error_email').subscribe(text => this.error_email = text);
    this.translate.get('message.password').subscribe(text => this.message_password = text);
    this.translate.get('message.information').subscribe(text => this.information = text);

    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(values:object):void {

    const today: number = Date.now();

    this.authservice.forgot(values['email'], this.translate.currentLang, today).subscribe(response => {
      if (response === false) {
        swal.fire('Error email', this.error_email, 'error');
      } else {
        swal.fire(this.information, this.message_password, 'success');
        this.router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }

}
