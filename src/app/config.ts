import { HttpHeaders } from '@angular/common/http';

export const cfg = {
  loginUrl: 'oauth/token',
  trainingUrl: 'training/',
  user: 'user',
  forgotUrl: 'forgot',
  changeurl: 'change',
  resetPassword: 'resetPassword',
  langs: 'langs',
  lang: 'lang',
  client: 'client',
  diet: 'diet',
  rpe: 'rpe',
  weight: 'weight',
  training: 'training',
  advice: 'advice',
  wellness: 'wellness',

  headerLogin: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  }),
  time: '259200000',
  url_backend: 'https://fitcontroller.com/api/',
  photo_url: 'https://fitcontroller.com/images/photos/'
};
