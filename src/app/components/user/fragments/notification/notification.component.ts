import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() public notification;

  public token;
  public identity;
  public url;
  public loading;
  public userProfile;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()

    this.userProfile = this.identity

    this.url = GLOBAL.url
  }

  ngOnInit() {
  }

}
