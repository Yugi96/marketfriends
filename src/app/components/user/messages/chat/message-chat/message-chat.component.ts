import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.css']
})
export class MessageChatComponent implements OnInit {
  @Input() public message;

  public token;
  public identity;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }

}
