import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

import swal from 'sweetalert2';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: User;

  private error_login: string;
  public  errors: String[];

  public loginForm: FormGroup;
  public settings: Settings;

  constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, 
              private translate: TranslateService, private authservice: AuthService, private langService: LangService){

    if (this.authservice.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.user = new User();
    
    this.settings = this.appSettings.settings; 
    this.translate.get('error.error_login').subscribe(text => this.error_login = text);

    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])] 
    });
  }

  public onSubmit(values: User): void {
    if (this.loginForm.valid) {
      this.user.email = values.email;
      this.user.password = values.password;
  
      this.authservice.login(this.user).subscribe(response => {
        this.authservice.saveToken(response.access_token);
        this.authservice.getUser().subscribe(data => {
          if (data['user'].updated_at == null){
            this.router.navigate(['/login/restore-password']);
          }
          this.authservice.saveUser(data['user']);
          this.authservice.saveTrainer(data['trainer']);
          this.langService.getLang(this.translate.currentLang).subscribe( response => {
            sessionStorage.setItem('langid', response.toString());
            this.router.navigate(['/home']);
          });
        });
      },
      error => {
        if (error.status === 400) {
          swal.fire('Error login', this.error_login, 'error');
        }
      });
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}