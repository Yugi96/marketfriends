import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Output() public getFriend = new EventEmitter()

  public showMessagesContent;

  public token;
  public identity;
  public url;

  public loading;

  public friends;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()

    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.showMessagesContent = false;

    if (this.identity.username && this.token) {
      this.getFriends()
    }
  }

  getFriends() {
    this._userService.showFriendsorRequest(this.identity.username, 'friends').subscribe(resp => {
      this.friends = resp.message
    }, error => {
      console.log('error: ', error)
    })
  }

  getDataFriend(friend) {
    this.getFriend.emit(friend)
  }

}
