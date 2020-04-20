
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppConfig from '../config';
import { User } from './../models/user';
import { Trainer } from './../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private cfg: any;
  private _user: User;
  private _trainer: Trainer;
  private _token: string;
  private _expiretoken: string;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get trainer(): Trainer {
    if (this._trainer != null) {
      return this._trainer;
    } else if (this._trainer == null && sessionStorage.getItem('trainer') != null) {
      this._trainer = JSON.parse(sessionStorage.getItem('trainer')) as Trainer;
      return this._trainer;
    }
    return new Trainer();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get expireToken(): string {
    if (this._expiretoken != null) {
      return this._expiretoken;
    } else if (this._expiretoken == null && sessionStorage.getItem('token') != null) {
      this._expiretoken = sessionStorage.getItem('expirein');
      return this._expiretoken;
    }
    return null;
  }

  login(user: User): Observable<any> {

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.email);
    params.set('password', user.password);
    params.set('client_id', '2');
    params.set('client_secret', 'KHA2dfOBEaIeOFI18JQ24yQVuZai5Zf5A87ZNPqg');
    params.set('scope', '*');

    sessionStorage.clear();

    return this.http.post<any>(this.cfg.url_backend + this.cfg.loginUrl, params.toString(), {headers: this.cfg.headerLogin});
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.user);
  }

  saveUser(data: any): void {
    this._user = new User();
    this._user.id = data.id;
    this._user.name = data.name;
    this._user.surname = data.surname;
    this._user.email = data.email;
    this._user.role = data.roles;
    this._user.active = data.active;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveTrainer(trainer: Trainer): void {
    this._trainer  = new Trainer();
    this._trainer.id = trainer.id;
    this._trainer.name = trainer.name;
    this._trainer.surname = trainer.surname;
    sessionStorage.setItem('trainer', JSON.stringify(this._trainer));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  expireIn(expireToken: string):void {
    this._expiretoken = expireToken;
    sessionStorage.setItem('expirein', this._expiretoken);
  }

  logout(): void {
    this._token = null;
    this._user = null;
    this._trainer = null;
    sessionStorage.clear();
  }

   hasRole(role: string): boolean {
    for ( const r of this.user.role) {
      if (r.name === role) {
        return true;
      }
     }
    return false;
  }

  forgot(email: string, lang: string, today: number): Observable<any> {

    const params = new URLSearchParams();

    params.set('email', email);
    params.set('lang', lang);
    params.set('time', today.toString());

    return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.forgotUrl, params.toString(),
     {headers: this.cfg.headerLogin});
  }

  changePassword(password: string, id: number, reset: boolean): Observable<any> {
    const params = {"password": password, "id": id.toString()};

    if (reset) {
      return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.resetPassword, params);
    } else {
      return this.http.post<any>(this.cfg.url_backend + this.cfg.trainingUrl + this.cfg.changeurl, params);
    }


  }

  isAuthenticated(): boolean {
    let response = false;
    if (this.token == null) {
      response = false;
    } else {
      response = true;
    }
    return response;
  }

}
