import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './websocket.service'
import { Subject } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public url;
  public identity;
  public token;

  public message;

  constructor(
    public _http: HttpClient,
    public _websocketService: WebsocketService
  ) {
    this.url = GLOBAL.url
    this.message = this._websocketService.messageWSOn()
  }

  messageWSEmit(from, to, message) {
    this._websocketService.messageWSEmit(from, to, message)
  }

  addMessage(message, to, token): Observable<any> {
    let params = JSON.stringify({ message, to })
    let headers = new HttpHeaders().set('Authorization', token)
      .set('Content-Type', 'application/json')
    return this._http.post(`${this.url}/message/add`, params, { headers: headers })
  }

  showMessage(token, friend): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token)
    return this._http.get(`${this.url}/message/show/${friend}`, { headers: headers })
  }
}
