import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { WeightService } from '../../services/weight.service';

import { Weight } from '../../models/weight';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
})
export class WeightComponent implements OnInit {

  public weight: Weight;
  weightForm: FormGroup;
  files: Array<FileUploadModel> = [];
  @Input() accept = 'image/*';

  constructor(private weightservice: WeightService, private formBuilder: FormBuilder, private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {

    this.weightForm = this.formBuilder.group({
      weight: ['', [Validators.required]],
      photo_date: ['', [Validators.required]],
    });

  }

  onSubmit(values: object) {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    const fd = new FormData();

    if (this.files.length > 0) {

      fd.append('weight', this.weightForm.get('weight').value);

      const photoDate = this.datePipe.transform(this.weightForm.get('photo_date').value, 'yyyy-MM-dd');
      fd.append('photo_date', photoDate);
      fd.append('photo', this.files[0].data);
    } else {
      fd.append('weight', this.weightForm.get('weight').value);
      fd.append('photo_date', this.weightForm.get('photo_date').value);
    }

    this.weightservice.setWeight(fd).subscribe(response => {
    });

  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.splice(0, 1);
        this.files.push({ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true });
      }

    };
    fileUpload.click();
  }

}


export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
