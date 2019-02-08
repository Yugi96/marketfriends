import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service'
import { Observable, Subject } from 'rxjs/Rx'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messages: Subject<any>

  constructor(private _websocketService: WebsocketService) {
    // this.messages = <Subject<any>>_websocketService
    //   .connect()
    //   .map((response: any): any => {
    //     return response
    //   })
  }

  sendMessage(message) {
    // this.messages.next(message)
  }
}
