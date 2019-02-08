import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import * as Rx from 'rxjs/Rx'
import { GLOBAL } from './global'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket

  constructor() {
    this.socket = io(GLOBAL.websocketUrl)
   }

  connect(username) {
    this.socket.emit('userLoggedIn', username)
  }

  disconnect(username) {
    this.socket.emit('userLoggedOut', username)
  }

  friendRequestWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('friendsRequest', (data) => observer.next(data))
    })
  }

  friendRequestWSEmit(friend, me, code) {
    this.socket.emit('friendsRequest', { friend, me, code })
  }

  countNotificationWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('countNotification', (data) => observer.next(data))
    })
  }

  countNotificationWSEmit(friend, me) {
    this.socket.emit('countNotification', { friend, me })
  }

  countFriendsRequestWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('countFriendsRequest', (data) => observer.next(data))
    })
  }

  countFriendsRequestWSEmit(friend, me) {
    this.socket.emit('countFriendsRequest', { friend, me })
  }

  countReactionsWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('countLikes', (data) => observer.next(data))
    })
  }

  countReactionsWSEmit(id, type) {
    this.socket.emit('countLikes', { id, type })
  }

  messageWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new-message', (data) => observer.next(data))
    })
  }

  messageWSEmit(from, to, message) {
    this.socket.emit('new-message', { from, to, message })
  }

  commentWSOn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new-comment', (data) => observer.next(data))
    })
  }

  commentWSEmit(message) {
    this.socket.emit('new-comment', message)
  }
}
