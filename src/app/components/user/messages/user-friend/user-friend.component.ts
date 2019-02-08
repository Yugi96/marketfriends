import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-user-friend',
  templateUrl: './user-friend.component.html',
  styleUrls: ['./user-friend.component.css']
})
export class UserFriendComponent implements OnInit {
  @Input() public friend;

  @Output() public getUserFriend = new EventEmitter()

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

  getUserFriendClick(friend) {
    this.getUserFriend.emit(friend)
  }

}
