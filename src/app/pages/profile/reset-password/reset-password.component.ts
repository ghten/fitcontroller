import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MustMatch } from './../../../validators/must-match.validator';

import { AuthService } from './../../../services/auth.service';
import * as AppConfig from './../../../config';

import swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private cfg: any;
  private error_date: string;
  private error_password: string;
  private password_changed: string;
  private id: number;
  private reset: boolean;
  private urllogin: string;

  passwordForm: FormGroup;

  constructor(private translate: TranslateService,
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {

      /************************validators****************************************/
      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });

      this.cfg = AppConfig.cfg;
      this.reset = false;
    }

  ngOnInit() {

    this.translate.get('error.error_date').subscribe(text => this.error_date = text);
    this.translate.get('error.error_password').subscribe(text => this.error_password = text);
    this.translate.get('message.password changed').subscribe(text => this.password_changed = text);

    const url = this.router.url;
    const tree: UrlTree = this.router.parseUrl(url);

    const link = tree.queryParams['link'];

    if (link != null) {

      this.id = tree.queryParams['line'];
      const today: number = Date.now();

      this.urllogin = '/login';

      const time = this.cfg.time;

      const dif = today - link;

      this.reset = true;

      if (dif > time) {
        swal.fire('Error date', this.error_date, 'error');
        this.router.navigate([this.urllogin]);
      }
    } else {
      this.id = this.authservice.user.id;
    }
   }

  onSubmit(values:Object) {
    if (this.passwordForm.valid) {
      this.authservice.changePassword(values['password'], this.id, this.reset).subscribe(response => {
        if (response === false) {
          swal.fire('Error password false', this.error_password, 'error');
        } else {
          swal.fire('password', this.password_changed, 'success');
          this.authservice.logout();
          this.router.navigate(['/login']);
        }
      },
      error => {
        if (error.status === 400) {
          swal.fire('Error password', this.error_password, 'error');
        }

      });
    }
  }
}
