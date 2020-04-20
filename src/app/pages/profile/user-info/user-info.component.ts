import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public personalForm: FormGroup;
  public countries;

  constructor(private formBuilder: FormBuilder, private userservice: UserService, private authservice: AuthService,
              private router: Router) {  }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      surname: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      sex: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      tel: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      postcode: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      countries_selector: ['', Validators.required],
      state : ['',  Validators.compose([Validators.required, Validators.maxLength(45)])],
      direction : ['',  Validators.compose([Validators.required, Validators.maxLength(255)])],
      city : ['',  Validators.compose([Validators.required, Validators.maxLength(45)])],
      birthday : [''],
      height: [''],
      target: ['', Validators.maxLength(255)]

    });

    this.userservice.getUser().subscribe(data => {

      this.countries = data.countries;

      this.personalForm.patchValue({
        name:  data.user.name,
        surname: data.user.surname,
        email: data.user.email,
        tel: data.client.telephone,
        postcode: data.client.postcode,
        countries_selector: data.client.countries_id,
        state : data.client.state,
        direction : data.client.direction,
        city : data.client.city,
        birthday: data.client.birthday,
        height: data.client.height,
        sex: data.client.sex,
        target: data.client.target,
     });
    });

  }

  public onSubmit(values: object): void {
      if (this.personalForm.valid) {

        this.userservice.update(values).subscribe(response => {
          this.authservice.saveUser(response);
          this.router.navigate(['/home']);
        });
      }
  }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
  }
}
