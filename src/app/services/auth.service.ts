import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { WebsocketService } from './websocket.service'
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class AuthService {
  public url: string;
  loggedIn: Subject<boolean>;
  public identity;
  public token;
  friendsOnline: Subject<any>

  constructor(public _http: HttpClient, private _websocketService: WebsocketService) {
    this.url = GLOBAL.url
    this.loggedIn = new Subject()
    // this.friendsOnline = <Subject<any>>_websocketService
    //   .connect()
    //   .map((response: any): any => {
    //     return response
    //   })

  }

  signup(user, gettoken = null) {
    if (gettoken !== null) {
      user.gettoken = gettoken
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/auth/login`, params , { headers: headers })
  }

  userLoggedInWS(username) {
    this._websocketService.connect(username)
  }

  userLoggedOutWS(username) {
    this._websocketService.disconnect(username)
  }


  sendEmailRestorePassword(user) {
    let params = `email=${user.email}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(`${this.url}/auth/send-email-restore-password`, params , { headers: headers, withCredentials: true })
  }

  verifyCodeRestorePassword(encode) {
    let params = `encode=${encode}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(`${this.url}/auth/verify-encode-restore-password`, params , { headers: headers, withCredentials: true })
  }

  restorePassword(encode, password) {
    let params = `encode=${encode}&password=${password}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(`${this.url}/auth/restore-password`, params , { headers: headers, withCredentials: true })
  }

  verifyAccount(code) {
    return this._http.get(`${this.url}/auth/verify-account/${code}`)
  }

  // isLoggedIn() {
  //   this._http.get('http://localhost:3000/auth/login', { withCredentials: true }).subscribe((resp: any) => {
  //     if (!resp.loggedIn) {
  //       localStorage.removeItem('user')
  //     }
  //     if (!localStorage.getItem('user')) {
  //       this.loggedIn.next(false);
  //       this.logout()
  //     } else {
  //       this.loggedIn.next(resp.loggedIn);
  //     }
  //   }, (errorResp) => {
  //     this.loggedIn.next(false);
  //     localStorage.removeItem('user')
  //   })
  // }

  accountStatus(email) {
    return this._http.get(`${this.url}/auth/account-status/${email}`)
  }

  reSendEmail(email) {
    return this._http.get(`${this.url}/auth/resend-email/${email}`)
  }

  // logout() {
  //   localStorage.removeItem('user')
  //   return this._http.get('http://localhost:3000/auth/logout', { withCredentials: true });
  // }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'))
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = null
    }
    return this.identity
  }

  getToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = token;
    } else {
      this.token = null
    }
    return this.token
  }
}
