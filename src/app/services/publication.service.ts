import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './websocket.service'
import { Subject } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url;
  public identity;
  public token;

  public countReactions;
  public comment;

  constructor(
    public _http: HttpClient,
    public _websocketService: WebsocketService,
    ) {
    this.url = GLOBAL.url
    this.countReactions = this._websocketService.countReactionsWSOn()
    this.comment = this._websocketService.commentWSOn()
  }

  deletePublication(publicationId, typePublication, tokenUser) {
    let headers = new HttpHeaders().set('Authorization', tokenUser)
    return this._http.delete(`${this.url}/publication/delete/${publicationId}/${typePublication}`, { headers: headers })
  }

  getComments(publicationId, typePublication, tokenUser) {
    let headers = new HttpHeaders().set('Authorization', tokenUser)
    return this._http.get(`${this.url}/publication/comments/${publicationId}/${typePublication}`, { headers: headers })
  }

  countReactionsEmitWS(id, type) {
    this._websocketService.countReactionsWSEmit(id, type)
  }

  commentEmitWS(message) {
    this._websocketService.commentWSEmit(message)
  }

  getPublicationsAll(page, tokenUser) {
    let headers = new HttpHeaders().set('Authorization', tokenUser)
    return this._http.get(`${this.url}/publication/${page}`, { headers: headers })
  }

  getPublicationsByUsername(page, tokenUser, username) {
    let headers = new HttpHeaders().set('Authorization', tokenUser)
    return this._http.get(`${this.url}/publication/${username}/${page}`, { headers: headers })
  }

  like(publicationId, publicationType, token) {
    let headers = new HttpHeaders().set('Authorization', token)
    let urlPublication = ''
    if (publicationType === 'image') {
      urlPublication = `${this.url}/publication/reaction/image/create/like/${publicationId}`
    } else {
      urlPublication = `${this.url}/publication/reaction/post/create/like/${publicationId}`
    }
    return this._http.get(urlPublication, { headers: headers })
  }

  addComment(publicationId, publicationType, token, comment) {
    let headers = new HttpHeaders().set('Authorization', token)
      .set('Content-Type', 'application/json')
    let params = JSON.stringify(comment)
    let urlPublication = ''
    if (publicationType === 'image') {
      urlPublication = `${this.url}/publication/comment/image/create/${publicationId}`
    } else {
      urlPublication = `${this.url}/publication/comment/post/create/${publicationId}`
    }
    return this._http.post(urlPublication, params, { headers: headers })
  }

}
