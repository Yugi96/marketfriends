import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input() public chat;
  @Output() public chatClose = new EventEmitter()

  @ViewChild("contentMessages") contentMessages: ElementRef;

  public arrayMessages: Array<any>;

  public token;
  public identity;
  public url;

  faTimes = faTimes;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.scrollToBottom();
    this._messageService.showMessage(this.token, this.chat.username).subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.arrayMessages = resp.message
      }
    })
    this._messageService.message.subscribe(data => {
      this.arrayMessages.push(data.message)
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.contentMessages.nativeElement.scrollTop = this.contentMessages.nativeElement.scrollHeight;
      } catch(err) { }
  }

  getChatUser(friend) {
    this.chatClose.emit(friend)
  }

  sendMessage(message, to) {
    this._messageService.addMessage(message.value, to, this.token).subscribe((resp: any) => {
      message.value = ''
      this._messageService.messageWSEmit(this.identity, to, resp.message)
    })
  }

}
