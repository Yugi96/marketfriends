import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './websocket.service'
import { Subject } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;
  friendRequest;
  countNotification;
  countFriendRequest;

  constructor(public _http: HttpClient, public _websocketService: WebsocketService) {
    this.url = GLOBAL.url
    this.friendRequest = _websocketService.friendRequestWSOn()
    this.countNotification = _websocketService.countNotificationWSOn()
    this.countFriendRequest = _websocketService.countFriendsRequestWSOn()
  }

  changeImageProfile(filename, token) {
    let headers = new HttpHeaders().set('Authorization', token)
    return this._http.post(`${this.url}/user/change-image-profile/${filename}`, '', { headers: headers })
  }

  getUsers(token) {
    let headers = new HttpHeaders().set('Authorization', token)
    return this._http.get(`${this.url}/user`, { headers: headers })
  }

  register(user): Observable<any> {
    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(`${this.url}/user/register`, params, { headers: headers })
  }

  actionFriendRequest(action, usernameFriend) {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/friend/action/${action}/${usernameFriend}`, { headers: headers })
  }

  getPhotosUser(usernameFriend) {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/publication/images/${usernameFriend}`, { headers: headers })
  }

  addFriend(usernameFriend) {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/friend/add/${usernameFriend}`, { headers: headers })
  }

  showNotification() {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/notification/show`, { headers: headers })
  }

  countNotificationApi() {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/notification/count`, { headers: headers })
  }

  countFriendsRequestApi() {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/friend/count`, { headers: headers })
  }

  readNotificacion() {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/notification/read-notification`, { headers: headers })
  }

  friendRequestEmit(friend, me, code) {
    this._websocketService.friendRequestWSEmit(friend, me, code)
  }

  countNotificationEmit(friend, me) {
    this._websocketService.countNotificationWSEmit(friend, me)
  }

  countFriendRequestEmit(friend, me) {
    this._websocketService.countFriendsRequestWSEmit(friend, me)
  }

  getProfile(username): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/user/profile/${username}`, { headers: headers })
  }

  isFriends(username): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/friend/is-friends/${username}`, { headers: headers })
  }

  showFriendsorRequest(username, type): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this._http.get(`${this.url}/friend/show/${username}/${type}`, { headers: headers })
  }

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
