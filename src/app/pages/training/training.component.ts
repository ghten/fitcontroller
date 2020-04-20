import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

import { TrainingService } from './../../services/training.service'; 
import { AuthService } from './../../services/auth.service';

import { Parttraining } from './../../models/parttraining';
import { Training } from './../../models/training';
import { Exercice } from './../../models/exercice';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public parttrainings: Parttraining[];
  public training: Training;
  public exercices: Exercice[];
  public nameCoach: string;

  constructor(private trainingservice: TrainingService, private authservice: AuthService,
              private embedService: EmbedVideoService) { }

  ngOnInit() {
    this.training = new Training();
    this.trainingservice.getTraining().subscribe(data => {
      this.training = data['training'];
      this.parttrainings = data['parttrainings'];

      let i = 0;
      for(let exercice of data['exercices']) {
        if (exercice['link_video'] != null) {
          data['exercices'][i].link_video = this.embedService.embed(exercice['link_video']);
        }
        i++;
      }
      this.exercices = data['exercices'];
      this.nameCoach = this.authservice.trainer.name + ' ' + this.authservice.trainer.surname;


    });
  }

}
